import { abrirSidebar, setMoodSidebar } from "@/features/sidebar/sidebarSlice";
import type { Task } from "@/types/Task"
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setTaskSeleccionado } from "../taskSlice";

type Props={
    task:Task
}

export const TaskCardTerminado = ({task}:Props)=>{

    const dispatch = useDispatch();

    const time = dayjs(task.updatedAt);

    const handleDetails = ()=>{
        dispatch(setTaskSeleccionado(task));
        dispatch(setMoodSidebar("detalle"));
        dispatch(abrirSidebar());
    }

    return(
        <div className="bg-white text-gray-800 rounded-4xl p-5 flex flex-col gap-y-3 relative overflow-hidden cursor-pointer" onClick={handleDetails}>
            <div className="flex items-center justify-between">
                <p className="font-semibold">{task.titulo}</p>
            </div>
            <div className="flex justify-between items-center">
                <p className={`text-xl text-white rounded-3xl px-5 py-2 font-semibold ${task.estado === "completado" ? 'bg-blue-500':'bg-gray-500'}`}>
                    {task.estado === "completado" ? 'Completado':'Cancelado'}
                </p>
                <p>{time.format("MMM. D")}</p>
            </div>
        </div>
    )

}