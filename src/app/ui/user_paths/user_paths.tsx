"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./user_paths.module.css";
import useLocalStorage from "@/hooks/useLocalStorage";
import { get_tasks, update_status } from "@/api/api_client";
import { FaChevronLeft } from "react-icons/fa";
import { get_paths } from "@/api/api_client";
import { loadJQuery } from "@/utils/helpers";
import Map from "../map/map";
import { FaTrash } from "react-icons/fa";

const User_paths = () => {
  //Params
  const searchParams = useSearchParams();
  const id: any = searchParams.get("id");
  //States
  const [user, setUser] = useState<any>();
  //local sotrage
  const [task, setTaskData] = useLocalStorage("tasks", []);
  const [selectedTaskPhotos, setSelectedTasksPhoto] = useLocalStorage(
    "tasksPhotos",
    []
  );
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    (async () => {
      let data = await get_paths(id);
      setPaths(data);
      console.log("data---", data, id);
    })();
  }, []);

  const toDeviceString = (
    manufacture: string | null,
    model: string | null,
    platform: string | null,
    device_version: string | null
  ) =>
    `${ifNullThenString(manufacture)} ${
      manufacture != null && model != null ? "-" : ""
    }  ${ifNullThenString(model)} ${
      model != null && platform != null ? "-" : ""
    } ${ifNullThenString(platform)} ${
      platform != null && device_version != null ? "-" : ""
    }${ifNullThenString(device_version)}`;
  const ifNullThenString = (data: string | null) => (data ? data : "");

  return (
    <div className={styles.container}>
      {user?.name && <h2>{task?.farmer_name} task detail</h2>}
      <a
        href="/dashboard"
        className={`${styles.btn} primary  text-capitalize pl-0 mr-2`}
      >
        <FaChevronLeft className={`${styles.chevron_style}  mr-2`} />
        BACK
      </a>
      <Map
        map_tasks_array={[]}
        style={{ height: "50vh" }}
        className={styles.map_div}
      />

      <div className="table_cont mt-3">
        <table className="w-100 table table_responsive ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Area</th>
              <th>Path start time</th>
              <th>Path end time</th>
              <th>Device</th>
              <th>Show on map</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paths?.map(function (path: any, index: number) {
              return (
                <tr key={index}>
                  <td data-label="Name" className="td_name">
                    {" "}
                    {path?.name}
                  </td>
                  <td data-label="Area">{path?.area} m&sup2;</td>
                  <td data-label="Path stat time">{path?.start}</td>
                  <td data-label="Path end time">{path?.end}</td>
                  <td data-label="Device">
                    {toDeviceString(
                      path.device_manufacture,
                      path.device_model,
                      path.device_platform,
                      path.device_version
                    )}
                  </td>
                  <td data-label="Show on map">
                    <input
                      className="form-check-input js_path_show_on_map"
                      type="checkbox"
                    />
                  </td>
                  <td data-label="Actions">
                    <div className="js_path_delete btn btn-danger">
                      <FaTrash className="fas fa-trash mr-2" />
                      Delete path
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User_paths;
