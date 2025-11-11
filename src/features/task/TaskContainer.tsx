import styles from './TaskContainer.module.css'
import { TaskColumnPendiente } from './TaskPendiente/TaskColumnPendiente'
import { TaskColumnProceso } from './TaskProceso/TaskColumnProceso'
import { TaskColumnTerminado } from './TaskTerminado/TaskColumnTerminado'

export const TaskContainer = ()=>{
    return(
        <>
            <div className={`grid grid-cols-3 gap-10 h-full overflow-hidden ${styles.task__container}`}>
                <TaskColumnPendiente/>
                <TaskColumnProceso/>
                <TaskColumnTerminado/>
            </div>
        </>
    )
}