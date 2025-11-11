import { AlertDialogTrigger,AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { X } from "lucide-react"

type Props={
    id:number,
    handleDelete:(id: number) => void
}

const CategoryAlertDialog = ({id,handleDelete}:Props)=>{
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button type="button" className="cursor-pointer pointer-events-none opacity-0 transition-opacity absolute p-1 -top-2 -right-3 bg-red-500 rounded-full">
                    <X size={15} className="text-white" strokeWidth={2.5}/>
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl">¿Seguro que quieres eliminar la categoría?</AlertDialogTitle>
                <AlertDialogDescription className="text-xl">
                    Al eliminar la categoria eliminarás todas las tareas relacionadas.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel className="text-xl! cursor-pointe border-none">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>handleDelete(id)} className="text-xl! font bg-red-500 text-white cursor-pointer">Eliminar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default CategoryAlertDialog