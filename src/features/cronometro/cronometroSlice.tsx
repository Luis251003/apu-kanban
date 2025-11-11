import type { Cronometro } from "@/types/Cronometro";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CronometroState{
    lista: Cronometro[]
}

const initialState: CronometroState = {
    lista: []
}

const cronometroSlice = createSlice({
    name:"cronometro",
    initialState:initialState,
    reducers:{
        iniciarCronometro: (state,action:PayloadAction<{idTask:number;duracion:number}>)=>{
            const now = Date.now();
            state.lista.push({
                idTask: action.payload.idTask,
                startTime:now,
                elapsedTime:0,
                remainingTime:action.payload.duracion * 60,
                isPaused:false
            });
        },
        actualizarCronometro: (state, action: PayloadAction<{ idTask: number; elapsedTime: number }>) => {
            const cron = state.lista.find(c => c.idTask === action.payload.idTask);
            if (cron) {
                cron.elapsedTime = action.payload.elapsedTime;
                cron.remainingTime = Math.max(cron.remainingTime - 1, 0);
            }
        },
        pausarCronometro:(state,action:PayloadAction<number>)=>{
            const cron = state.lista.find((c)=>c.idTask===action.payload)
            if(cron) cron.isPaused = true;
        },
        toggleCronometro:(state,action:PayloadAction<number>)=>{
            const cron = state.lista.find((c)=>c.idTask===action.payload)
            if(cron) cron.isPaused = !cron.isPaused;
        },
        eliminarCronometro: (state, action: PayloadAction<number>) => {
            state.lista = state.lista.filter(c => c.idTask !== action.payload);
        },
    }
})

export const {iniciarCronometro,actualizarCronometro,toggleCronometro,pausarCronometro,eliminarCronometro} = cronometroSlice.actions
export default cronometroSlice.reducer