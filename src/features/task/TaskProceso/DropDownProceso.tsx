import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Check, MoreHorizontal, X} from "lucide-react"

type Props={
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>;
    handleComplete:()=>void;
}

export const DropDownProceso = ({setIsOpen,handleComplete}:Props)=>{

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button type="button" className="cursor-pointer transition ease-in-out duration-300 hover:bg-gray-200 p-2 rounded-2xl">
                    <MoreHorizontal size={20}/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto p-4" align="start">
                <p className="text-lg text-gray-600 pl-2">Ajustes</p>
                <DropdownMenuLabel className="text-xl pt-0">Herramientas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="flex flex-col gap-3">
                    <DropdownMenuItem className="text-xl [&>svg]:size-6 items-start" onClick={(e)=>{e.stopPropagation();handleComplete()}}>
                        <Check className="mt-1"/>
                        <div>
                            <p>Completar</p>
                            <p className="text-base">Completar tarea en proceso</p>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xl [&>svg]:size-6 items-start" onClick={(e)=>{e.stopPropagation();setIsOpen(true)}}>
                        <X className="mt-1"/>
                        <div>
                            <p>Cancelar</p>
                            <p className="text-base">Cancelar tarea en proceso</p>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}