"use client";
import styles from "./task_gallery.module.css";
import Map from "../map/map";
import { FaSync } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import Modal_ from "../modal/modal";
import { loadJQuery } from "@/utils/helpers";
import { FaTimesCircle } from "react-icons/fa";
import DropdownMap from "../map/dropdown_map";
import useLocalStorage from "@/hooks/useLocalStorage";
import { FaTrash } from "react-icons/fa";

const TaskGallery = ({ taskPhotos, isUnassigned }: any) => {
  const [photos, setPhotos] = useState(taskPhotos);
  const [showModal, setShowModal] = useState({ isShow: false, index: -1 });
  const [selectedTaskPhotos, setSelectedTasksPhoto] = useLocalStorage(
    "tasksPhotos",
    []
  );
  useEffect(() => {
    const initJQuery = async () => {
      const $ = await loadJQuery();
      $(document)
        .on("click", ".js_open_ekf", async function () {
          $(".js_hidden_ekf").fadeIn(200);
        })
        .on("click", ".close_popup", function () {
          $(this).parent().fadeOut(200);
        });
      return () => {
        $("click").off("click");
      };
    };
    if (typeof window !== "undefined") {
      initJQuery();
    }
  }, []);

  const handleRotate = (id: number, direction: string) => {
    const withAngleUpdate = photos.map((photo: any) => {
      if (photo?.photo?.digest === id) {
        const newAngle = photo?.angle
          ? direction === "left"
            ? photo?.angle - 90
            : photo?.angle + 90
          : direction === "left"
          ? -90
          : 90;
        return { ...photo, angle: newAngle };
      }
      return photo;
    });
    setSelectedTasksPhoto(withAngleUpdate);
    setPhotos(withAngleUpdate);
  };

  const handleClose = () => setShowModal({ isShow: false, index: -1 });

  const handlePhotoCheckBox = (id: number) => {
    const withCheckUpdate = photos.map((photo: any) => {
      if (photo?.photo?.digest === id) {
        const check = !photo.hasOwnProperty("check") ? true : !photo?.check;
        return { ...photo, check: check };
      }
      return photo;
    });

    setPhotos(withCheckUpdate);
    setSelectedTasksPhoto(withCheckUpdate);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }} id="task">
      <DropdownMap map_tasks_array={taskPhotos} />

      <div className="float-left w-100 unassigned-actions-row">
        {isUnassigned && (
          <div>
            <a
              href="#"
              className="js_select_all_photos btn btn-outline-secondary text-capitalize mb-2 mr-lg-2 mr-2"
            >
              Select All
            </a>
            <a
              href="#"
              className="js_deselect_all_photos btn btn-outline-secondary text-capitalize mb-2 mr-lg-2 mr-2"
            >
              Cancel Selection
            </a>
            <button
              type="button"
              className="js_photo_multi_delete btn btn-danger text-capitalize mb-2 "
            >
              <FaTrash className="fas fa-trash mr-2" />
              Delete Selected
            </button>
          </div>
        )}

        <div>
          {isUnassigned && (
            <button
              type="button"
              className="js_button_open_task_select btn btn-primary mb-2 ml-lg-auto mr-2"
            >
              Choose Task
            </button>
          )}

          <a
            id="task_pdf_export"
            target="_blank"
            className="btn btn-primary text-capitalize mb-2 ml-lg-2 mr-2"
            href={`/pdf_preview?selected=${false}`}
          >
            Export To PDF
          </a>
          <a
            id="task_pdf_export_selected"
            target="_blank"
            className="btn btn-primary text-capitalize mb-2 ml-lg-2"
            // href={`/pdf_preview?selected=${true}`}
            onClick={() => {
              let selectedPhotos = photos.some(
                (item: any) => item.check == true
              );
              if (selectedPhotos) {
                window.open(`/pdf_preview?selected=${true}`);
              } else {
                alert("No photo selected!");
              }
            }}
          >
            Export Selected To PDF
          </a>
        </div>
      </div>

      <div id="task_photos">
        {photos?.map(function (task: any, index: number) {
          const imageSrc = `data:image/jpeg;base64,${task?.photo?.photo}`;

          return (
            <div className="thumb" key={task?.photo?.digest}>
              <div className="top_action_bar">
                <div className="js_photo_rotate">
                  <div
                    className="icon_cont js_photo_rotate_left"
                    onClick={() => handleRotate(task?.photo?.digest, "left")}
                  >
                    <FaSync
                      className="fas"
                      style={{ transform: "scaleX(-1)" }}
                    />
                  </div>
                  <div
                    className="icon_cont js_photo_rotate_right"
                    onClick={() => handleRotate(task?.photo?.digest, "right")}
                  >
                    <FaSync className="fas" />
                  </div>
                </div>
              </div>
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
                onClick={() => {
                  if (!isUnassigned) {
                    setShowModal({
                      isShow: true,
                      index: index,
                    });

                    handlePhotoCheckBox(task?.photo?.digest);
                  }
                }}
              >
                <img src={imageSrc} />
              </label>
              <div className="js_photo_metadata_popup">
                <div
                  className="icon_cont js_photo_select"
                  onClick={() => handlePhotoCheckBox(task?.photo?.digest)}
                >
                  <FaCheck className="fas" /> Select
                </div>
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
      <div className="js_hidden_ekf">
        <span className="close_popup">
          <FaTimesCircle
            className="fas fa-times-circle"
            style={{ background: "white" }}
          />
        </span>
        <table>
          <tr>
            <td></td>
            <td className="bold">GPS L1</td>
            <td className="bold">GPS L5</td>
            <td className="bold">GPS Iono Free (L1/L5)</td>
            <td className="bold">Galileo E1</td>
            <td className="bold">Galileo E5a</td>
            <td className="bold">Galileo Iono Free (E1/E5a)</td>
          </tr>
          <tr>
            <td className="bold">Latitude</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="bold">Longitude</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="bold">Altitude</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="bold">Reference</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="bold">Time</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <Modal_
        modal={showModal}
        handleClose={handleClose}
        photos={photos}
        setModal={setShowModal}
        rotateLeft={(digest: any) => handleRotate(digest, "left")}
        rotateRight={(digest: any) => handleRotate(digest, "right")}
      />
    </div>
  );
};

export default TaskGallery;
