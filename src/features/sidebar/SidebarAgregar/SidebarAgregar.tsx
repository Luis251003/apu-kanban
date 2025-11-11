import { Controller, useForm } from "react-hook-form"
import { DatePicker } from "../components/DatePicker"
import { zodResolver } from "@hookform/resolvers/zod"
import { taskAgregarSchema } from "../validations/taskAgregarSchema"
import { useEffect, useMemo } from "react"

import imgBajo from '@/assets/img_low_priority.png'
import imgMedio from '@/assets/img_medium_priority.png'
import imgUrgente from '@/assets/img_high_priority.png'
import imgDefault from '@/assets/img_default_priority.png'
import { useDispatch, useSelector } from "react-redux"
import { agregarTareaPendiente, editarTareaPendiente, eliminarTareaPendiente } from "@/features/task/taskSlice"
import type { Task } from "@/types/Task"
import type { RootState } from "@/redux/store"
import { cerrarSidebar } from "../sidebarSlice"
import { SidebarAlertDelete } from "./SidebarAlertDelete"

type Props={
    task:Task|null;
    mood:string
}
const defaultValues = {
    titulo: "",
    duracion: "",
    prioridad: "",
    fecha: undefined,
}

export const SidebarAgregar = ({task,mood}:Props)=>{

    const{register,handleSubmit,formState:{errors},watch,control,reset} = useForm({
        resolver: zodResolver(taskAgregarSchema),
        defaultValues: {
            titulo: "",
            duracion: "",
            prioridad: "",
            fecha: undefined,
        }
    })

    const dispatch = useDispatch();
    const idCategoria = useSelector((state:RootState)=>state.categorias.categoriaActual?.idCategory)
    const prioridadSeleccionada = watch("prioridad")

    useEffect(()=>{

        if(task && mood === "update"){
            reset({
                titulo:task.titulo,
                duracion:task.duracion.toString(),
                prioridad:task.prioridad as "urgente" | "normal" | "bajo",
                fecha:new Date(task.expiredAt)
            })
        }else{
            reset(defaultValues)
        }

    },[task,mood])

    const imagenPrioridad = useMemo(()=>{
        switch(prioridadSeleccionada){
            case "bajo":
                return imgBajo;
            case "normal":
                return imgMedio;
            case "urgente":
                return imgUrgente;
            default:
                return imgDefault;
        }
    },[prioridadSeleccionada])

    const onSubmit = handleSubmit((value)=>{
        //Recopilamos nueva tarea
        if(!idCategoria && idCategoria!==0)return;
        const bean: Task = {
            idTask: mood === "update" && task ? task.idTask : Date.now(),
            titulo: value.titulo,
            duracion: parseInt(value.duracion),
            prioridad: value.prioridad as "urgente" | "normal" | "bajo",
            estado: task?.estado ?? "pendiente",
            favorito: task?.favorito ?? false,
            createdAt: task?.createdAt ?? new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            startedAt:null,
            expiredAt: value.fecha.toISOString(),
            observacion: task?.observacion ?? null,
            finishedAt: task?.finishedAt ?? null,
            idCategory: idCategoria,
        };
        console.log(bean)
        //Validamos si es crear o editar
        if(mood==="create"){
            dispatch(agregarTareaPendiente(bean))
        }else{
            dispatch(editarTareaPendiente(bean))
        }
        reset(defaultValues);
        dispatch(cerrarSidebar())
    })

    const handleDelete = ()=>{
        if(!task)return;
        reset(defaultValues);
        dispatch(eliminarTareaPendiente(task.idTask))
        dispatch(cerrarSidebar())
    }

    return(
        <> 
            <form className=" grid grid-cols-2 gap-y-5 gap-x-5" onSubmit={onSubmit}>
                <div className="flex flex-col col-span-2 gap-3">
                    <label htmlFor="titulo" className="text-gray-500 text-xl">Titulo</label>
                    <input type="text" id="titulo" placeholder="Ingresa un título" className={`bg-gray-100 p-4 rounded-2xl border ${errors.titulo ? "border-red-500":""}`} {...register("titulo")}/>
                    {errors.titulo && <span className="text-red-500 text-xl block">{errors.titulo.message}</span>}
                </div>
                <Controller
                    name="fecha"
                    control={control}
                    render={({field})=>(
                        <DatePicker date={field.value} setDate={field.onChange} errors={errors}/>  
                    )}
                />
                <div className="flex flex-col gap-3">
                    <label htmlFor="duracion" className="text-gray-500 text-xl">Duración</label>
                    <div className="relative">
                        <input onInput={(e)=>{
                            const input = e.target as HTMLInputElement;
                            input.value = input.value.replace(/[^0-9]/g, '');}} type="text" id="duracion" className={`bg-gray-100 p-4 pl-10 rounded-2xl border w-full ${errors.duracion ? "border-red-500":""}`} {...register("duracion")} 
                        />
                        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                            minutos
                        </span>
                    </div>
                    {errors.duracion && <span className="text-red-500 text-xl block">{errors.duracion.message}</span>}
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="prioridad" className="text-gray-500 text-xl">Prioridad</label>
                    <select id="prioridad" className={`bg-gray-100 p-4 rounded-2xl border ${errors.prioridad ? "border-red-500":""}`} {...register("prioridad")}>
                        <option value="">Seleccionar</option>
                        <option value="bajo">Bajo</option>
                        <option value="normal">Normal</option>
                        <option value="urgente">Urgente</option>
                    </select>
                    {errors.prioridad && <span className="text-red-500 text-xl block">{errors.prioridad.message}</span>}
                </div>
                <div className="flex items-center justify-center pt-10">
                    <img src={imagenPrioridad} alt="" className="max-w-25"/>
                </div>
                {mood === "update" && task ? (
                    <>
                        <button type="submit" className="bg-green-500 col-span-2 block text-white rounded-2xl py-4 cursor-pointer hover:bg-green-600 transition ease-in-out duration-300 hover:shadow-xl">
                            Actualizar
                        </button>
                        <SidebarAlertDelete handleDelete={handleDelete}/>
                    </>
                ):(
                    <input type="submit" className="bg-blue-500 col-span-2 block text-white rounded-2xl py-4 cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300 hover:shadow-xl" value="Registrar" />
                )}
            </form>
        </>
    )
}