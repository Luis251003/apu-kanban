import type { Task } from "@/types/Task";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TaskState{
    tasks: Task[]
    taskSeleccionado:Task|null
}

const initialState: TaskState = {
  tasks: [],
  taskSeleccionado:null
}

const taskSlice = createSlice({
    name: "tareasPendientes",
    initialState: initialState,
    reducers:{
        agregarTareaPendiente: (state,action:PayloadAction<Task>)=>{
            state.tasks.push(action.payload)
        },
        editarTareaPendiente: (state,action:PayloadAction<Task>)=>{
            const index = state.tasks.findIndex(task => task.idTask === action.payload.idTask);
            if (index !== -1) {
                state.tasks[index] = {
                ...state.tasks[index],
                ...action.payload, // actualiza solo los campos modificados
                updatedAt: new Date().toISOString(), // opcional: actualiza fecha de edición
                };
            }
        },
        eliminarTareaPendiente: (state,action:PayloadAction<number>)=>{
            state.tasks = state.tasks.filter((task)=>task.idTask!== action.payload)
        },
        setTaskSeleccionado: (state,action:PayloadAction<Task|null>)=>{
            state.taskSeleccionado = action.payload
        }
    }
})

export const {agregarTareaPendiente,editarTareaPendiente,eliminarTareaPendiente,setTaskSeleccionado} = taskSlice.actions
export default taskSlice.reducer