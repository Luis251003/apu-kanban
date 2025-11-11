import type { Task } from "@/types/Task"
import { useEffect, useMemo, useState } from "react";

import imgBajo from '@/assets/img_low_priority.png'
import imgMedio from '@/assets/img_medium_priority.png'
import imgUrgente from '@/assets/img_high_priority.png'
import imgDefault from '@/assets/img_default_priority.png'
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { actualizarCronometro, eliminarCronometro, toggleCronometro } from "@/features/cronometro/cronometroSlice";
import { editarTareaPendiente } from "../taskSlice";
import { DropDownProceso } from "./DropDownProceso";
import { TaskAlertDialog } from "./TaskAlertDialog";

type Props={
    task:Task
}

export const TaskCardProceso = ({task}:Props)=>{

    const dispatch = useDispatch();
    const cronometro = useSelector((state:RootState)=>state.cronometro.lista.find((c)=>c.idTask===task.idTask))
    const [isOpen,setIsOpen]= useState(false);

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

    useEffect(() => {
        //Validaciones

        //Si el cronometro existe o esta en pausa
        if (!cronometro || cronometro.isPaused) return;

        const interval = setInterval(() => {
            if(cronometro.remainingTime>0){
                dispatch(actualizarCronometro({ idTask: task.idTask, elapsedTime: cronometro.elapsedTime + 1 }));
            }
        }, 1000);

        //Si el cronometro ya termino
        if (cronometro.remainingTime <= 0){
            dispatch(eliminarCronometro(task.idTask));
            dispatch(editarTareaPendiente({ ...task, estado: "terminado",finishedAt: new Date().toISOString() }));
        }

        return () => clearInterval(interval);
    }, [cronometro?.isPaused, cronometro?.elapsedTime]);

    if (!cronometro) return null;

    const minutos = Math.floor(cronometro.remainingTime / 60);
    const segundos = cronometro.remainingTime % 60;

    const progressPercent = useMemo(() => {
        if (!cronometro) return 100; // si no ha iniciado
        const { remainingTime, elapsedTime } = cronometro;
        const total = remainingTime + elapsedTime;
        const progress = (remainingTime / total) * 100;
        return Math.max(progress, 0);
    }, [cronometro?.remainingTime, cronometro?.elapsedTime]);

    const handleClick = ()=>{
        dispatch(toggleCronometro(task.idTask))
    }

    const handleComplete = ()=>{
        const new_task:Task={
            ...task,
            estado:"completado",
            finishedAt:new Date().toISOString()
        }
        dispatch(editarTareaPendiente(new_task))
    }

    const handleDelete = ()=>{
        setIsOpen(false);
        const newTask:Task={
            ...task,
            estado:"cancelado"
        }
        dispatch(editarTareaPendiente(newTask))
    }

    return(
        <div className="bg-white text-gray-800 rounded-4xl p-5 flex flex-col gap-y-3 relative overflow-hidden cursor-pointer" onClick={handleClick}>
            <div className="flex items-center justify-between">
                <p className="font-semibold">{task.titulo}</p>
                <DropDownProceso setIsOpen={setIsOpen}  handleComplete={handleComplete}/>
                <TaskAlertDialog handleDelete={handleDelete} isOpen={isOpen} setIsOpen={setIsOpen}/>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-xl bg-gray-200 rounded-3xl px-5 py-2 font-bold">
                    {cronometro.isPaused ? ("En pausa") : (`${minutos}:${segundos.toString().padStart(2, "0")}${minutos!==0 ? " min": " seg"}`)}
                </p>
                <img src={imgPrioridad} alt="" className="max-w-20"/>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                <div
                className={`h-full ${cronometro.isPaused ? 'bg-gray-800':'bg-blue-500'} transition-all duration-1000 ease-linear`}
                style={{ width: `${progressPercent}%` }}
                />
            </div>
        </div>
    )
}