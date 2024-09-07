"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./assign_task.module.css";
import { FaChevronLeft } from "react-icons/fa";
import { loadJQuery } from "@/utils/helpers";
import { get_unassigned_photos, get_photo } from "@/api/api_client";
import { get_auth_session } from "@/utils/auth_operations";
import { authenticated_user } from "@/types/user_types";
import DropdownMap from "../map/dropdown_map";
const AssignTask = () => {
  //Params
  const searchParams = useSearchParams();
  const taskId: any = searchParams.get("task_id");
  const [photos, setPhotos] = useState();

  useEffect(() => {
    const initJQuery = async () => {
      const $ = await loadJQuery();
      var timer: any;
      $(".tt").hover(
        function () {
          clearTimeout(timer);
          var elem = this;
          timer = setTimeout(function () {
            $(elem).find(".tt_body").fadeIn(250);
          }, 750);
        },
        function () {
          $(this).find(".tt_body").hide();
          clearTimeout(timer);
        }
      );

      return () => {
        $(".tt").off("hover");
        $("click").off("click");
      };
    };
    if (typeof window !== "undefined") {
      initJQuery();
    }

    const fetchData = async () => {
      var task_photo_data;
      var map_unassigned_array = [];
      const session: any = await get_auth_session();
      let user: authenticated_user = await JSON.parse(session?.value);
      console.log("User id ---", user.id);

      let photos_ids = await get_unassigned_photos(user.id);

      for (let id of photos_ids) {
        const result = await get_photo(id);
        // photos_array.push(result)
        task_photo_data = {
          id: id,

          farmer_name: `${user.name} ${user.surname}`,
          photo: result,
          location: [result?.lng, result?.lat],
        };

        // setUnAssignedPhotos(map_unassigned_array);
        map_unassigned_array.push(task_photo_data);
      }
      console.log("Unassigned photo ---", map_unassigned_array);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {<h2 style={{}}>Gallery of unassigned photos</h2>}
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <a
          href="/photo_gallery"
          className={`${styles.btn} primary  text-capitalize pl-0 mr-2`}
        >
          <FaChevronLeft className={`${styles.chevron_style}  mr-2 `} />
          BACK
        </a>
      </div>
      <DropdownMap map_tasks_array={[]} />
      <div id="task_photos">
        {photos?.map(function (task: any, index: number) {
          const imageSrc = `data:image/jpeg;base64,${task?.photo?.photo}`;
          return (
            <div className="thumb" key={task?.photo?.digest}>
              <input
                className="assign_photo_input"
                data-field="status"
                data-fieldtype="new"
                type="checkbox"
                checked={task?.check}
              />
              <label
                className="thumbnail"
                style={{ transform: `rotate(${task?.angle}deg)` }}
              >
                <img src={imageSrc} />
              </label>
              <div className="js_photo_metadata_popup">
                <table className={`${styles.table}`}>
                  <tbody>
                    <tr>
                      <td>
                        <label className="dark" title="{{ pht_lat_title }}">
                          Latitude
                        </label>
                      </td>
                      <td>
                        <label title="{{ pht_lat }}">{task?.photo?.lat}</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="dark" title="{{ pht_lng_title }}">
                          Longitude
                        </label>
                      </td>
                      <td>
                        <label title="{{ pht_lng }}">{task?.photo?.lng}</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="dark" title="{{ pht_alt_title }}">
                          Altitude
                        </label>
                      </td>
                      <td>{/* <label title="{{ pht_alt }}"> m</label> */}</td>
                    </tr>
                    <tr>
                      <td>
                        <label className="dark" title="{{ pht_azimuth_title }}">
                          Azimut
                        </label>
                      </td>
                      <td>
                        <label title="{{ pht_azimuth }}">
                          {task?.photo?.photo_heading}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="dark" title="{{ pht_angle_title }}">
                          Vertical angle
                        </label>
                      </td>
                      <td>
                        <label title="{{ pht_angle }}"></label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="dark" title="{{ pht_note_title }}">
                          Note
                        </label>
                      </td>
                      <td>
                        <label title="{{ pht_note }}">
                          {task?.photo?.note}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="dark" title="{{ pht_device_title }}">
                          Device
                        </label>
                      </td>
                      <td>
                        <label title="{{ pht_device }}"></label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          className="dark"
                          title="{{ pht_accuracy_title }}"
                        >
                          Accuracy
                        </label>
                      </td>
                      <td>
                        {/* <label title="{{ pht_accuracy }}"> m</label> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          className="dark"
                          title="{{ pht_distance_title }}"
                        >
                          Distance
                        </label>
                      </td>
                      <td>
                        {/* <label title="{{ pht_distance }}">m</label> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          className="dark"
                          title="{{ pht_distance_nmea_title }}"
                        >
                          Distance (GNSS)
                        </label>
                      </td>
                      <td>
                        {/* <label title="{{ pht_distance_nmea }}"> m</label> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          className="dark"
                          title="{{ pht_timestamp_title }}"
                        >
                          Timestamp
                        </label>
                      </td>
                      <td>
                        <label title="{{ pht_timestamp }}"></label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          className="dark"
                          title="{{ pht_created_date_title }}"
                        >
                          Created (UTC)
                        </label>
                      </td>
                      <td>
                        <label title="{{ pht_created_date }}">
                          {task?.photo?.created}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <label className="js_open_ekf" data-id="123">
                          Show EKF metadata
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssignTask;
