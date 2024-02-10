import {create} from "zustand";

export interface MolStoreInterface{
    movieId?: string,
    isOpen: boolean,
    openModal: (movieId:string) => void,
    closeModal:() => void
};

const useInfoModal = create<MolStoreInterface> ((set)=>({
    movieId: undefined,
    isOpen: false,
    openModal: (movieId:string) => set({isOpen:true,movieId}),
    closeModal:() => set({isOpen:false,movieId:undefined})
}));

export default useInfoModal;