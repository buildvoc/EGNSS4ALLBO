import FarmersTasks from "../ui/dashboard/farmers_tasks/farmers_tasks";
import styles from "../ui/dashboard/dashboard.module.css";
import User_paths from "../ui/user_paths/user_paths";

const UserPaths = () => {
  return (
    <div className={styles.wrapper} >
      <div className={styles.farmers_tasks}>
        <User_paths />
      </div>
    </div>
  );
};

export default UserPaths;
