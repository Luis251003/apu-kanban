import type { Filtro } from "@/types/Filtro"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { arrayFiltros } from "./store/filtros"

interface filterState {
    filtroSeleccionado:Filtro
}

const initialState: filterState ={
    filtroSeleccionado:arrayFiltros[0]
}

const filterSlice = createSlice({
    name:"filtro",
    initialState:initialState,
    reducers:{
        setFiltro: (state,action:PayloadAction<Filtro>)=>{
            state.filtroSeleccionado=action.payload
        }
    }
})

export const {setFiltro} = filterSlice.actions
export default filterSlice.reducer