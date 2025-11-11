import CategoryContainer from "./category/CategoryContainer";
import HeaderContainer from "./header/HeaderContainer";
import { Sidebar } from "./sidebar/Sidebar";
import { TaskContainer } from "./task/TaskContainer";
import styles from './index.module.css'

const KanbanPage = () =>{
    return (
        <div className="overflow-hidden relative">
            <Sidebar/>
            <div className="flex items-center h-screen">
                <div className={`w-full contenedor flex h-[80vh]`}>
                    <CategoryContainer/>
                    <div className={`pl-20 w-full flex flex-col overflow-hidden ${styles.main__container}`}>
                        <div className="flex-none mb-4">
                            <HeaderContainer />
                        </div>
                        <div className="flex-1 pr-4 overflow-y-auto">
                            <TaskContainer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default KanbanPage;