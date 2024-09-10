import FarmersTasks from "../ui/dashboard/farmers_tasks/farmers_tasks";
import styles from "../ui/dashboard/dashboard.module.css";
const Home = () => {
    return (
        <div  className={styles.wrapper}>
            <div className={styles.farmers_tasks}>
             <FarmersTasks />
             </div>
        </div>
    );
}


export default Home;