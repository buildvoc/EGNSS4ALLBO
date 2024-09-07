import Task_detail from "../ui/task/task_detail";
import styles from "../ui/dashboard/dashboard.module.css";
import Gallery from "../ui/gallery/gallery";
const PhotoGallery= () => {
    return (
        <div  className={styles.wrapper}>
            <div className={styles.farmers_tasks}>
             <Gallery />
             </div>
        </div>
    );
}


export default PhotoGallery;