import { useDispatch, useSelector } from "react-redux";
import FilterBar from "./FilterBar";
import {Plus} from 'lucide-react';
import { abrirSidebar, setMoodSidebar } from "@/features/sidebar/sidebarSlice";
import type { RootState } from "@/redux/store";
import { setTaskSeleccionado } from "../task/taskSlice";

const HeaderContainer = ()=>{

    const dispatch = useDispatch();
    const titulo = useSelector((state:RootState)=>state.categorias.categoriaActual?.nombre)

    const handleClick = ()=>{
        dispatch(setMoodSidebar("create"))
        dispatch(setTaskSeleccionado(null))
        dispatch(abrirSidebar())
    }

    return(
        <div className="flex items-center justify-between w-full">
            <div>
                <p className="text-gray-500 font-medium">Categoria</p>
                <h1 className="mt-5 font-semibold">{titulo}</h1>
            </div>
            <div>
                <FilterBar/>
            </div>
            <div>
                <button onClick={handleClick} className="bg-blue-500 text-white py-3 px-8 rounded-xl cursor-pointer flex items-center justify-between hover:bg-blue-600 transition-colors duration-300 ease-in-out hover:shadow-xl" type="button">
                    <Plus className="pr-2 h-10 w-10"/>
                    Agregar
                </button>
            </div>
        </div>
    )
}
export default HeaderContainer;