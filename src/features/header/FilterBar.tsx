import { useState } from 'react';
import styles from './FilterBar.module.css' 
import { arrayFiltros } from './store/filtros';
import { useDispatch } from 'react-redux';
import { setFiltro } from './filterBarSlice';
import type { Filtro } from '@/types/Filtro';

const FilterBar = () =>{

    const dispatch = useDispatch();

    const [activeIndex, setActiveIndex] = useState(0);
    const filters = arrayFiltros

    const handleButton = (value:Filtro,index:number) =>{
        setActiveIndex(index)
        dispatch(setFiltro(value))
    }

    return (
        <div className={styles.filterbar__container}>
            <div
                className={styles.slider}
                style={{ transform: `translateX(${activeIndex * 100}%)` }}
            />
            {filters.map((filtro)=>
                <button
                    key={filtro.idFiltro}
                    type='button'
                    onClick={()=>handleButton(filtro,filtro.idFiltro)}
                    className={`${styles.button} ${activeIndex === filtro.idFiltro ? styles.active : ''}`}
                >{filtro.label}</button>
            )}
        </div>
    )
}
export default FilterBar;