"use client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaRegMap } from "react-icons/fa6";
import styles from "./farmers_tasks.module.css";
import { Table } from "react-bootstrap";
import { get_auth_session } from "@/utils/auth_operations";
import { authenticated_user } from "@/types/user_types";
import { useState, useRef, useEffect } from "react";
import { get_tasks } from "@/api/api_client";

const dummyData = [
  {
    id: "125899",
    status: "data checked",
    name: "kent test",
    text: "add photo point of view",
    text_returned: null,
    date_created: "2024-02-20 20:34:22",
    task_due_date: "2024-02-22 23:59:59",
    note: "data provided",
    number_of_photos: "1",
    flag_valid: "1",
    flag_invalid: "0",
    photos_ids: ["17805"],
  },
  {
    id: "125901",
    status: "data provided",
    name: "Tast 2",
    text: "Tast 2",
    text_returned: null,
    date_created: "2024-03-01 11:06:34",
    task_due_date: "2024-03-31 23:59:59",
    note: "no",
    number_of_photos: "1",
    flag_valid: "0",
    flag_invalid: "0",
    photos_ids: ["17811"],
  },
  {
    id: "125902",
    status: "data provided",
    name: "03-01-parking-demo",
    text: "test task",
    text_returned: null,
    date_created: "2024-03-01 17:46:29",
    task_due_date: "2024-03-08 23:59:59",
    note: "yes",
    number_of_photos: "1",
    flag_valid: "0",
    flag_invalid: "0",
    photos_ids: ["17810"],
  },
  {
    id: "125903",
    status: "data checked",
    name: "internal inspection",
    text: "desks",
    text_returned: null,
    date_created: "2024-03-04 18:42:53",
    task_due_date: "2024-03-08 23:59:59",
    note: "yes",
    number_of_photos: "2",
    flag_valid: "1",
    flag_invalid: "0",
    photos_ids: ["17806", "17807"],
  },
  {
    id: "125904",
    status: "data provided",
    name: "inspection external",
    text: "park area inspection",
    text_returned: null,
    date_created: "2024-03-04 18:44:39",
    task_due_date: "2024-03-08 23:59:59",
    note: "",
    number_of_photos: "1",
    flag_valid: "0",
    flag_invalid: "0",
    photos_ids: ["17819"],
  },
  {
    id: "125913",
    status: "new",
    name: "demo sync task with photo 01",
    text: "demo",
    text_returned: null,
    date_created: "2024-03-08 12:01:22",
    task_due_date: "2024-03-09 23:59:59",
    note: "",
    number_of_photos: "0",
    flag_valid: "0",
    flag_invalid: "0",
    photos_ids: [],
  },
  {
    id: "125923",
    status: "data provided",
    name: "webserver-assign-photo-task",
    text: "demo",
    text_returned: null,
    date_created: "2024-03-16 13:01:44",
    task_due_date: "2024-03-23 23:59:59",
    note: "",
    number_of_photos: "2",
    flag_valid: "0",
    flag_invalid: "0",
    photos_ids: ["17846", "17874"],
  },
];

const FarmersTasks = () => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const [tasks, set_tasks] = useState([]);
  const mapNode = useRef(null);

  useEffect(() => {

    const fetchData = async () => {
        const session: any = await get_auth_session();
        let user: authenticated_user = await JSON.parse(session?.value);
        let result = await get_tasks(user.id);
        console.log("Response---", result);
        set_tasks(result);
      };
      fetchData();


    console.log("Acess token:---", process.env.NEXT_PUBLIC_MAPBOX_TOKEN);
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;
    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 1,
    });
    // save the map object to React.useState
    setMap(mapboxMap);
    return () => {
      mapboxMap.remove();
    };
  }, []);

  const getSortClass = (field: string) => {
    // Define your logic to get the sort class based on the field
    return "sorted";
  };

  return (
    <div className={styles.container}>
      <div ref={mapNode} className={styles.map_continer} />
      {/* <div className={styles.map_dropdown_btn}>
          <span>
            <FaRegMap className={styles.map_icon} size={18} />
            Hide Map
          </span>
        </div> */}
      {/* Tasks List  */}
      {tasks.length>0 && (
        <div className={styles.table_responsive}>
          <div className={styles.showing_count}>{`Showing ${tasks.length} out of ${tasks.length}`}</div>
          <table className={`${styles.table} table-hover`}>
            <thead>
              <tr>
                <th>Status</th>
                <th>Photos taken</th>
                <th>Name</th>
                <th>Description</th>
                <th>Date created</th>
                <th>Due date</th>
                <th>Acception</th>
              </tr>
            </thead>
            <tbody>
              {
              tasks?.map(function(task:any,index){
                // console.log("task",index);
                // return(<div ></div>)
                return (
                  <tr key={index}>
                    <td data-label="Status">
                      <span
                        className={`task_status ${
                          task.status === "data checked"
                            ? `datachecked_${task.flag_valid}`
                            : task.status.replace(" ", "").toLowerCase()
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td data-label="Photos taken">{task.photos_ids.length}</td>
                    <td data-label="Name">{task.name}</td>
                    <td data-label="Description">{task.text}</td>
                    <td data-label="Date created">
                      {task.date_created.split(" ")[0]}
                    </td>
                    <td data-label="Due date">
                      {task.task_due_date.split(" ")[0]}
                    </td>
                    <td data-label="Acception">
                      {task.status == "data provided" ? (
                        <div className="btn btn-light btn_status w-100p">
                          waiting
                        </div>
                      ) : (
                        task.flag_valid === "1" && (
                          <div className="btn btn-success btn_status w-100p">
                            Accepted
                          </div>
                        )
                      )}
                    </td>
                  </tr>
                );
              })
              
              }
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FarmersTasks;
