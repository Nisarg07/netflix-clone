import axios from "axios";
import React,{useCallback,useMemo} from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavourites from "@/hooks/useFavourites";

interface FavouriteButtonsProps{
    movieId:string
};

const FavouriteButton:React.FC<FavouriteButtonsProps> = ({movieId}) => {
    const {mutate: mutateFavourites} = useFavourites();
    const {data:currentUser, mutate} = useCurrentUser();
    const isFavourite = useMemo(()=>{
        const list = currentUser?.favouriteIds || [];

        return list.includes(movieId);
    },[currentUser,movieId]);

    const toggleFavourite = useCallback( async ()=>{
        try{
            let response;
            if(isFavourite){
                response = await axios.delete('/api/favourite',{data:{movieId}});
            }else{axios.post('/api/favourite',{movieId})
                response = await axios.post('/api/favourite',{movieId});
            }

            const updatesFavouriteIds = response?.data?.favouriteIds;

            mutate({
                ...currentUser,
                favouriteIds:updatesFavouriteIds
            });

            mutateFavourites();
    }catch(error){
            console.log(error);
        }
    },[movieId,isFavourite,currentUser,mutate,mutateFavourites]);

    const Icon = isFavourite ? AiOutlineCheck : AiOutlinePlus;

    return (
        <div onClick={toggleFavourite} className="
        cursor-pointer
        group-item
        w-6
        h-6
        lg:w-10
        lg:h-10
        border-white
        border-2
        rounded-full
        flex
        items-center
        justify-center
        transition
        hover:border-neutral-300
        ">
            <Icon className="text-white" size={25}/>
        </div>
    )
}

export default FavouriteButton;