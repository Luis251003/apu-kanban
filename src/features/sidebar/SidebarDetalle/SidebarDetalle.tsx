import type { Task } from "@/types/Task";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { cerrarSidebar } from "../sidebarSlice";
import { SidebarAlertDelete } from "../SidebarAgregar/SidebarAlertDelete";
import { eliminarTareaPendiente } from "@/features/task/taskSlice";

type Props={
    task:Task
}

export const SidebarDetalle = ({task}:Props)=>{

    const dispatch = useDispatch();

    const handleEliminar = ()=>{
        dispatch(eliminarTareaPendiente(task.idTask))
        dispatch(cerrarSidebar());
    }

    return(
        <div className=" grid grid-cols-2 gap-y-5 gap-x-5">
            <div className="flex flex-col col-span-2 gap-3">
                <label htmlFor="titulo" className="text-gray-500 text-xl">Titulo</label>
                <input type="text" id="titulo" className={`bg-gray-100 p-4 rounded-2xl border cursor-default`} readOnly={true} value={task.titulo}/>
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="duracion" className="text-gray-500 text-xl">Duración</label>
                <div className="relative">
                    <input value={task.duracion} readOnly={true}  type="text" id="duracion" className={`bg-gray-100 p-4 pl-10 rounded-2xl border w-full cursor-default`}/>
                    <span className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                        minutos
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="prioridad" className="text-gray-500 text-xl">Prioridad</label>
                <input type="text" id="prioridad" className={`bg-gray-100 p-4 rounded-2xl border cursor-default text-center`} readOnly={true} value={task.prioridad}/>
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="fec_inicio" className="text-gray-500 text-xl">Fecha de Inicio</label>
                <input type="text" id="fec_inicio" className={`bg-gray-100 p-4 rounded-2xl border cursor-default text-center`} readOnly={true} value={dayjs(task.startedAt).format("MMM. D")}/>
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="fec_fin" className="text-gray-500 text-xl">Fecha de Fin</label>
                <input type="text" id="fec_fin" className={`bg-gray-100 p-4 rounded-2xl border cursor-default text-center`} readOnly={true} value={dayjs(task.finishedAt).format("MMM. D")}/>
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="hora_inicio" className="text-gray-500 text-xl">Hora de Inicio</label>
                <input type="text" id="hora_inicio" className={`bg-gray-100 p-4 rounded-2xl border cursor-default text-center`} readOnly={true} value={dayjs(task.startedAt).format("HH:mm A")}/>
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="hora_fin" className="text-gray-500 text-xl">Hora de Fin</label>
                <input type="text" id="hora_fin" className={`bg-gray-100 p-4 rounded-2xl border cursor-default text-center`} readOnly={true} value={dayjs(task.finishedAt).format("HH:mm A")}/>
            </div>
            <div className="flex flex-col gap-3 col-span-2">
                <label htmlFor="estado" className="text-gray-500 text-xl">Estado</label>
                <input type="text" id="estado" className={`bg-white p-4 rounded-2xl border cursor-default text-center`} readOnly={true} value={task.estado}/>
            </div>
            <SidebarAlertDelete handleDelete={handleEliminar}/>
        </div>
    )
}