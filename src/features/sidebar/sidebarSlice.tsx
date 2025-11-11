import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SidebarState{
    abierto:boolean;
    mood:string,
}

const initialState: SidebarState = {
    abierto:false,
    mood:"create"
}

const sidebarSlice = createSlice({
    name:"sidebar",
    initialState,
    reducers:{
        abrirSidebar: (state)=>{
            state.abierto = true
        },
        cerrarSidebar: (state)=>{
            state.abierto = false;
        },
        toggleSidebar: (state)=>{
            state.abierto = !state.abierto;
        },
        setMoodSidebar: (state,action:PayloadAction<string>)=>{
            state.mood  = action.payload
        }
    }
})

export const { abrirSidebar, cerrarSidebar, toggleSidebar, setMoodSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;