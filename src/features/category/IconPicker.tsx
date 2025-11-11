import { useState } from "react"
import { Store,Shirt,Martini,Cookie,Clapperboard,Plane,PiggyBank,Gem,HeartPlus,GraduationCap} from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { type LucideIcon } from "lucide-react"

type Props={
  selectedIcon: React.ElementType<any, keyof React.JSX.IntrinsicElements>;
  setSelectedIcon: React.Dispatch<React.SetStateAction<LucideIcon>>
}

export default function IconPicker({selectedIcon,setSelectedIcon}:Props) {
  const [open, setOpen] = useState(false)

  const icons = [
    { name: "Store", icon: Store },
    { name: "Shirt", icon: Shirt },
    { name: "Martini", icon: Martini },
    { name: "Cookie", icon: Cookie },
    { name: "Clapperboard", icon: Clapperboard },
    { name: "Plane", icon: Plane },
    { name: "PiggyBank", icon: PiggyBank },
    { name: "Gem", icon: Gem },
    { name: "HeartPlus", icon: HeartPlus },
    { name: "GraduationCap", icon: GraduationCap },
  ]

  const SelectedIcon = selectedIcon

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" className="cursor-pointer bg-gray-200 text-gray-600 p-3 rounded-2xl">
          <SelectedIcon size={20}/>
        </button>
      </PopoverTrigger>
      
      <PopoverContent className="w-[200px] h-[150px] overflow-y-auto grid grid-cols-5 bg-gray-100 border-none rounded-2xl">
        {icons.map(({name,icon:Icon})=>(
          <button
            key={name}
            onClick={() => {setSelectedIcon(Icon),setOpen(false)}}
            className="flex items-center justify-center text-gray-700 hover:text-blue-600 transition-color duration-300 ease-in-out cursor-pointer transform hover:scale-110"
          >
          <Icon size={22}></Icon>
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}