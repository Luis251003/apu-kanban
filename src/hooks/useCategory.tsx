import type { Category } from "@/types/Category";
import { useEffect, useState } from "react";
import { arrayCategorias } from "../../../store/categorias";

const useCategory = ()=>{
    const [categorias,setCategorias] = useState<Category[]>([]);
    const [isLoading,setIsLoading] = useState<boolean>(true);

    useEffect(()=>{
        handleListar();
    },[])

    function handleListar(){
        setCategorias(arrayCategorias);
        setIsLoading(false);
    }

    function agregar(bean:Category){
        setCategorias((data)=>
            [...data,bean]
        )
    }

    return{categorias,agregar,isLoading}

}
export default useCategory;