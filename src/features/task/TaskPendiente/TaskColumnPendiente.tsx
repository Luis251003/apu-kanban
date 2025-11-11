import { Ellipsis } from "lucide-react"
import { TaskCardPendiente } from "./TaskCardPendiente"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { motion, AnimatePresence } from "framer-motion"

export const TaskColumnPendiente = ()=>{

    //Obtenemos las tareas pendientes y diversos filtros
    const tareas = useSelector((state:RootState)=>state.tareas.tasks).filter((tareas)=>tareas.estado==="pendiente")
    const categoriaActual = useSelector((state:RootState)=>state.categorias.categoriaActual)
    const filtroActual = useSelector((state:RootState)=>state.filtro.filtroSeleccionado)
    let tareasFiltradas = tareas.filter((task) => task.idCategory === categoriaActual?.idCategory);
    if(filtroActual.value !== "todos")tareasFiltradas = tareasFiltradas.filter((task)=>task.prioridad === filtroActual.value)
    

    return(
        <div className={`flex flex-col rounded-2xl overflow-hidden shadow-sm ${tareasFiltradas.length>0?'h-full':'h-max'}`}>
            <div className="flex justify-between items-center flex-none">
                <h3 className="font-bold text-3xl">Inicio</h3>
                <button type="button" className="cursor-pointer">
                    <Ellipsis size={27} className="transition ease-in-out hover:bg-gray-300 p-2 rounded-xl"/>
                </button>
            </div>
            {tareasFiltradas.length > 0 &&
                <div className="mt-5 flex-1 flex flex-col gap-5 overflow-y-auto pr-2 ">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={categoriaActual?.idCategory ?? "none"}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex flex-col gap-5"
                        >
                            {tareasFiltradas.length > 0 && (
                            tareasFiltradas.map((task, number) => (
                                <TaskCardPendiente key={number} task={task}/>
                            ))
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            }
        </div>
    )
}
