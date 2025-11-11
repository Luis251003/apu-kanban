import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

type Props={
    handleDelete:() => void
}

export const SidebarAlertDelete = ({handleDelete}:Props)=>{
    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button type="button" className="bg-red-500 col-span-2 block text-white rounded-2xl py-4 cursor-pointer hover:bg-red-600 transition ease-in-out duration-300 hover:shadow-xl">
                    Eliminar
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl">Eliminar Tarea</AlertDialogTitle>
                <AlertDialogDescription className="text-xl">
                    ¿Seguro que quieres eliminar la tarea?
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel className="text-xl! cursor-pointe border-none">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="text-xl! font bg-red-500 text-white cursor-pointer">Eliminar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}