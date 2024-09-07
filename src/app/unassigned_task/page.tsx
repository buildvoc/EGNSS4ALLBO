import Task_detail from "../ui/task/task_detail";
import styles from "../ui/dashboard/dashboard.module.css";
import UnassignedTasks from "../ui/unassigned_tasks/unassigned_tasks";
const unassigned_task= () => {
    return (
        <div  className={styles.wrapper}>
            <div className={styles.farmers_tasks}>
             <UnassignedTasks />
             </div>
        </div>
    );
}


export default unassigned_task;