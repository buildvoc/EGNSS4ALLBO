import Task_detail from "../ui/task/task_detail";
import styles from "../ui/dashboard/dashboard.module.css";
const Task = () => {
    return (
        <div  className={styles.wrapper}>
            <div className={styles.farmers_tasks}>
             <Task_detail />
             </div>
        </div>
    );
}


export default Task;