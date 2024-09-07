import Task_detail from "../ui/task/task_detail";
import styles from "../ui/dashboard/dashboard.module.css";
import AssignTask from "../ui/assign_task/assign_task";
const ChooseTask= () => {
    return (
        <div  className={styles.wrapper}>
            <div className={styles.farmers_tasks}>
             <AssignTask />
             </div>
        </div>
    );
}


export default ChooseTask;