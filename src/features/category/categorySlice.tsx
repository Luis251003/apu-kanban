import type { Category } from '@/types/Category'
import{createSlice,type PayloadAction} from '@reduxjs/toolkit'
import { arrayCategorias } from './store/categorias'

interface CategoryState {
  categorias: Category[],
  categoriaActual: Category | null,
}

const initialState: CategoryState = {
  categorias: arrayCategorias,
  categoriaActual: arrayCategorias[0]
}

const categorySlice = createSlice({
  name: "categorias",
  initialState: initialState,
  reducers: {
    agregarCategoria: (state,action:PayloadAction<Category>)=>{
        state.categorias.push(action.payload)
    },
    eliminarCategoria: (state,action:PayloadAction<number>)=>{
        state.categorias = state.categorias.filter((cat)=>cat.idCategory !== action.payload)
    },
    setCategoriaActual: (state,action:PayloadAction<string>)=>{
      const bean = state.categorias.find((c)=>c.nombre===action.payload)
      if(!bean)return;
      state.categoriaActual  = bean
    }
  }
})

export const { agregarCategoria, eliminarCategoria,setCategoriaActual } = categorySlice.actions
export default categorySlice.reducer