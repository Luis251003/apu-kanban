import {z} from "zod";

const priorities = ["urgente","normal","bajo"] as const;

export const taskAgregarSchema = z.object({
    titulo: z
        .string()
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,30}$/, "Ingresar entre 3 a 30 caracteres"),
    duracion: z
        .string()
        .regex(/^\d{1,3}$/, "Ingresar 1 a 3 dígitos"),
    prioridad: z
        .string()
        .refine((val) => val !== "", { message: "Seleccionar prioridad" })
        .pipe(z.enum(priorities)),
    fecha: z.date({
        error: "Debes seleccionar una fecha"
    }),
}).refine(
    (data)=>data.fecha >= new Date(new Date().setHours(0,0,0,0)),
    {
        error:"La fecha debe ser hoy o posterior",
        path:["fecha"]
    }
)