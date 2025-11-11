import {z} from "zod";

export const categorySchema = z.object({
    nombre: z.string()
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{3,30}$/,{error:"Debes ingresar categoría valida"})
})
