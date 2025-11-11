import { Play } from "lucide-react"

import type { Task } from "@/types/Task"
import { useMemo } from "react"
import dayjs from "dayjs";

import imgBajo from '@/assets/img_low_priority.png'
import imgMedio from '@/assets/img_medium_priority.png'
import imgUrgente from '@/assets/img_high_priority.png'
import imgDefault from '@/assets/img_default_priority.png'
import { useDispatch } from "react-redux";
import { abrirSidebar, setMoodSidebar } from "@/features/sidebar/sidebarSlice";
import { editarTareaPendiente, setTaskSeleccionado } from "../taskSlice";
import { iniciarCronometro } from "@/features/cronometro/cronometroSlice";

type Props={
    task:Task,
}

export const TaskCardPendiente = ({task}:Props)=>{

    const time = dayjs(task.expiredAt);
    const dispatch = useDispatch();

    const imgPrioridad = useMemo(()=>{
        switch(task.prioridad){
            case "bajo":
                return imgBajo;
            case "normal":
                return imgMedio;
            case "urgente":
                return imgUrgente;
            default:
                return imgDefault;
        }
    },[task.prioridad])

    const handleEdit = ()=>{
        dispatch(setMoodSidebar("update"))
        dispatch(setTaskSeleccionado(task))
        dispatch(abrirSidebar())
    }

    const handleIniciar = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.stopPropagation();
        //Actualizamos el estado de la tarea
        const updatedTask:Task = {
            ...task,
            startedAt: new Date().toISOString(),
            estado: "proceso"
        };
        dispatch(editarTareaPendiente(updatedTask))
        dispatch(iniciarCronometro({idTask:task.idTask,duracion:task.duracion}))
    }

    return(
        <div className="bg-gray-800 rounded-4xl p-5 flex flex-col gap-y-3 cursor-pointer" onClick={()=>handleEdit()}>
            <div className="flex text-white items-center justify-between">
                <p className="font-medium">{task.titulo}</p>
                <button type="button" onClick={handleIniciar} className="cursor-pointer transition ease-in-out duration-300 hover:bg-gray-600 p-2 rounded-2xl">
                    <Play size={20}/>
                </button>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-white text-xl font-light">{time.format("MMM. D")}</p>
                <img src={imgPrioridad} alt="" className="max-w-20"/>
            </div>
        </div>
    )
}