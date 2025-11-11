import { SidebarIcon } from "lucide-react"
import { SidebarAgregar } from "./SidebarAgregar/SidebarAgregar"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/redux/store";
import styles from './sidebar.module.css'
import { cerrarSidebar } from "./sidebarSlice";
import { SidebarDetalle } from "./SidebarDetalle/SidebarDetalle";

export const Sidebar = () =>{

    const dispatch = useDispatch();
    const taskSeleccionado = useSelector((state:RootState)=>state.tareas.taskSeleccionado)
    const { abierto, mood } = useSelector((state: RootState) => state.sidebar);

    // Render condicional del contenido
    const renderContent = () => {
        switch (mood) {
        case "detalle":
            return <SidebarDetalle task={taskSeleccionado!}/>;
        default:
            return <SidebarAgregar task={taskSeleccionado} mood={mood}/>;
        }
    };

    return (
        <aside className={`right-0 top-0 bg-white w-140 h-full rounded-tl-4xl rounded-bl-4xl shadow-xl ${styles.sidebar} ${abierto ? styles.open : ''}`}>
            <div className="flex justify-end pt-5 pr-5">
                <button type="button" onClick={()=>dispatch(cerrarSidebar())} className="cursor-pointer hover:bg-gray-200 hover:scale-110 transition ease-in-out duration-300 p-3 rounded-2xl">
                    <SidebarIcon/>
                </button>
            </div>
            <header className="p-10 pt-0">
                <h3 className="text-gray-400 font-light">Evento</h3>
                <h2 className="font-bold text-3xl">
                    {mood === "create" && "Agregar tarea"}
                    {mood === "update" && "Editar Tarea"}
                    {mood === "detalle" && "Detalle de Tarea"}
                </h2>
            </header>
            <section className="p-10 pt-0">
                {renderContent()}
            </section>
        </aside>
    )
}