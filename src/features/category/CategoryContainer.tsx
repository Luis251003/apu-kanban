// import { Heart } from "lucide-react"
import CategoryDialog from "./CategoryDialog"
import { useDispatch, useSelector } from "react-redux"
import styles from './CategoryContainer.module.css'
import CategoryAlertDialog from "./CategoryAlertDialog"
import { getIconByName } from "@/hooks/utilIcon"
import { eliminarCategoria, setCategoriaActual } from "@/features/category/categorySlice"
import type { RootState } from "@/redux/store"

const CategoryContainer = () =>{

    const dispatch = useDispatch();
    const categorias = useSelector((state: RootState) => state.categorias.categorias)

    const handleDelete = (id:number)=>{
        dispatch(eliminarCategoria(id))
        dispatch(setCategoriaActual("Home"))
    }

    return (
        <div className="bg-gray-100 w-30 h-auto rounded-xl flex flex-col py-8">
            <div className="flex gap-5 flex-col items-center">
                {categorias.map((value,index)=>{
                    const Icon = getIconByName(value.icono);
                    return(
                        <div className={`relative transition-color duration-300 ease-in-out hover:scale-110 ${styles.button__container}`} key={index}>
                            {value.nombre !== "Home" && 
                                <CategoryAlertDialog handleDelete={handleDelete} id={value.idCategory}/>
                            }
                            <button type="button" onClick={()=>dispatch(setCategoriaActual(value.nombre))} className={`py-3.5 px-3.5 ${value.nombre==='Home' ? 'bg-blue-500':'bg-gray-400'} ${styles.button}  rounded-full cursor-pointer transition-color duration-300 ease-in-out`}>
                                <span className={`${styles.label} pointer-events-none`}>{value.nombre}</span>
                                <Icon className="text-white" strokeWidth={2.5} size={25}/>
                            </button>
                        </div>
                    )
                })}
                <CategoryDialog size={categorias.length}/>
            </div>
            {/* <div className="flex items-center justify-center mt-auto">
                <button type="button" className={`py-3.5 px-3.5 text-gray-500 hover:text-gray-600 transition-color duration-300 ease-in-out cursor-pointer transform hover:scale-110 ${styles.button}`}>
                    <span className={styles.label}>Favorito</span>
                    <Heart size={25} strokeWidth={2.5}/>
                </button>
            </div> */}
        </div>
    )
}

export default CategoryContainer