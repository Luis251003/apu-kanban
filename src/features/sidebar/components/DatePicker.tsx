import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react";
import * as React from "react"
import type { FieldErrors } from "react-hook-form";

type Props = {
    date: Date | undefined,
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
    errors: FieldErrors<{
        titulo: string;
        duracion: string;
        prioridad: "urgente" | "normal" | "bajo";
        fecha: Date;
    }>
}

export const DatePicker = ({date,setDate,errors}:Props)=>{

    const [open, setOpen] = React.useState(false)

    return(
        <div className="flex flex-col gap-3 w-full">
            <label htmlFor="date" className="text-gray-500 text-xl">Fecha</label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button 
                        type="button"
                        id="date"
                        className={`justify-between font-normal w-full p-4 flex items-center bg-gray-100 rounded-2xl border ${errors.fecha ? "border-red-500":""}`}
                    >
                        <span className={date ? "" : "text-gray-500"}>{date ? date.toLocaleDateString() : "dd/mm/yyyy"}</span>
                        <CalendarIcon size={15}/>
                    </button>
                </PopoverTrigger>
                {errors.fecha && (
                <span className="text-red-500 text-xl">
                    {errors.fecha.message}
                </span>
                )}
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    className="bg-white w-70 text-lg"
                    id="fecha"
                    onSelect={(date) => {
                    setDate(date)
                    setOpen(false)
                    }}
                />
                </PopoverContent>
            </Popover>
        </div>
    );
}