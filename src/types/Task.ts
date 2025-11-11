export type Task={
    idTask:number,
    titulo:string,
    duracion:number,
    prioridad:string,
    estado:string,
    observacion:string | null,
    favorito:boolean,
    createdAt:string,
    updatedAt:string,
    startedAt:string|null,
    finishedAt:string | null,
    expiredAt:string,
    idCategory:number
}