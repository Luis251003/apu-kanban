import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/features/category/categorySlice"
import sidebarReducer from "@/features/sidebar/sidebarSlice"
import taskReducer from '@/features/task/taskSlice'
import filtroReducer from '@/features/header/filterBarSlice'
import cronometroReducer from '@/features/cronometro/cronometroSlice'

export const store = configureStore({
    reducer:{
        sidebar: sidebarReducer,
        categorias: categoryReducer,
        tareas: taskReducer,
        filtro: filtroReducer,
        cronometro: cronometroReducer
    }
})

// Tipos para usar en componentes
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch