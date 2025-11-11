import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

type Props={
    handleDelete:()=>void;
    isOpen:boolean;
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>
}

export const TaskAlertDialog = ({handleDelete,isOpen,setIsOpen}:Props)=>{
    return(
        <AlertDialog open={isOpen}>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl">Cancelar Tarea</AlertDialogTitle>
                <AlertDialogDescription className="text-xl">
                    ¿Seguro que deseas cancelar la tarea?
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel onClick={()=>setIsOpen(false)} className="text-xl! cursor-pointe border-none">Volver</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="text-xl! font bg-red-500 text-white cursor-pointer">Cancelar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}