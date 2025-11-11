import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react"

export function getIconByName(name:string):LucideIcon{
    const iconsMap = Icons as unknown as Record<string, LucideIcon>
    const icon = iconsMap[name]
    return icon || Icons.Folder
}