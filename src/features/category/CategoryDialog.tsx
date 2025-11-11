import { DialogContent, DialogClose, Dialog,DialogTrigger } from "@/components/ui/dialog";
import IconPicker from "./IconPicker";
import { useState} from "react";
import { Plus,Folder } from "lucide-react";
import {useForm} from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { DialogTitle } from "@radix-ui/react-dialog";
import type { Category } from "@/types/Category";
import { type LucideIcon } from "lucide-react"
import { useDispatch } from "react-redux";
import { agregarCategoria } from "@/features/category/categorySlice";
import { toast } from "sonner"
import styles from './CategoryContainer.module.css'
import { categorySchema } from "./validations/categorySchema";

type Props={
    size:number
}

const CategoryDialog = ({size}:Props)=>{
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [selectedIcon, setSelectedIcon] = useState<LucideIcon>(Folder)

    const{register,handleSubmit,reset,formState:{errors}} = useForm({
        resolver:zodResolver(categorySchema)
    });

    const onSubmit = handleSubmit((data)=>{
        if(!selectedIcon.displayName)return;
        //Recopilamos nueva categoria
        const nuevaCategoria:Category = {
            idCategory:Date.now(),
            nombre:data.nombre,
            icono:selectedIcon.displayName,
        }
        //Registramos la categoria
        dispatch(agregarCategoria(nuevaCategoria))
        //Cerramos el modal
        setOpen(false);
        //Reseteamos el formulario y el icono
        reset();
        setSelectedIcon(Folder)
    })

    const handleOpenChange = (nextState:boolean)=>{
        if(nextState && size>=5){
            toast.info("Solo se permiten crear hasta 5 categorias")
            return;
        }
        setOpen(nextState)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <button type="button" className={`text-gray-500 py-4 hover:text-gray-600 transition-colors duration-300 ease-in-out cursor-pointer transform hover:scale-110 ${styles.button}`}>
                    <Plus size={25}/>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[350px] bg-white border-none rounded-4xl">
                <form onSubmit={onSubmit} className="flex flex-col gap-10">
                    <div className="flex justify-between items-center">
                        <DialogTitle className="font-mono text-3xl">Agregar Categoria</DialogTitle>
                        <IconPicker selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon}/>
                    </div>
                    <div>
                        <div className="bg-gray-200 rounded-2xl flex flex-col">
                            <label htmlFor="nombre" className="px-7 py-4 border-b-2 border-gray-300 font-medium">Titulo</label>
                            <input type="text" id="nombre" className="p-7 outline-none" placeholder="Ingresar Categoria" {...register("nombre")}/>
                        </div>
                        {errors.nombre && <span className="text-red-500 text-2xl block mt-4 text-center">{errors.nombre.message}</span>}
                    </div>
                    <div className="flex flex-col gap-4">
                        <button type="submit" className="bg-blue-500 text-white rounded-3xl py-5 cursor-pointer hover:bg-blue-600 transition-colors duration-300 ease-in-out">Agregar</button>
                        <DialogClose asChild>
                            <button className="bg-gray-200 rounded-3xl py-5 cursor-pointer hover:bg-gray-300 transition-colors duration-300 ease-in-out">Cancel</button>
                        </DialogClose>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default CategoryDialog;