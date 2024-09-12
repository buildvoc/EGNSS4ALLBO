"use client";
import styles from "@/app/ui/pdf_preview/pdf_preview.module.css";
import useLocalStorage from "@/hooks/useLocalStorage";
import { cnvrtImgUrl } from "@/utils/helpers";
import { useSearchParams } from "next/navigation";
import Map from "../ui/map/map";
import { useEffect, useState } from "react";
import ClientPdfRenderer from "../ui/pdf/ClientPdfRenderer";
import { get_auth_session } from "@/utils/auth_operations";
import { authenticated_user } from "@/types/user_types";
import { get_unassigned_photos, get_photo } from "@/api/api_client";
import { pages } from "next/dist/build/templates/app-page";

const PdfPreview = () => {
  const searchParams = useSearchParams();
  const selected: any = searchParams.get("selected");
  const photo_gallery: any = searchParams.get("photo_gallery");
  const ids: any = searchParams.get("ids");
  const length: any = searchParams.get("length");
  const [pdfPhotos, setPdfPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("length ---", length);

  const [selectedTaskPhotos, setSelectedTasksPhoto] = useLocalStorage(
    "tasksPhotos",
    []
  );
  const [isGenerate, setIsGenerated] = useState({
    generate: false,
    length:
      selected == "true"
        ? selectedTaskPhotos.filter((task: any) => task.check).length
        : selectedTaskPhotos.length,
  });

  const getPhotosIds = async (id: number) => {
    console.log("user id ---", id);
    let photos_ids = await get_unassigned_photos(id);
    console.log("photos ids ---", photos_ids);
    return photos_ids;
  };

  async function getImgByIds(photos_ids: any, user_name: any) {
    var map_unassigned_array = [];
    for (let id of photos_ids) {
      const result = await get_photo(id);
      // photos_array.push(result)
      var task_photo_data;
      task_photo_data = {
        id: id,
        farmer_name: user_name,
        photo: result,
        location: [result?.lng, result?.lat],
      };

      // setUnAssignedPhotos(map_unassigned_array);
      map_unassigned_array.push(task_photo_data);
    }
    return map_unassigned_array;
  }

  const getPhotos = async () => {
    const session: any = await get_auth_session();
    let user: authenticated_user = await JSON.parse(session?.value);
    console.log("user ---", user);
    const photos_ids: any =
      selected == "true"
        ? ids
          ? ids.split(",")
          : []
        : await getPhotosIds(user.id);
    const photos: any = await getImgByIds(
      photos_ids,
      `${user.name} ${user.surname}`
    );
    setIsGenerated((values) => ({ ...values, length: photos.length }));

    console.log("Unassigned photo ---", photos);
    setIsLoading(false);
    setPdfPhotos(photos);
  };

  useEffect(() => {
    photo_gallery == "true" && getPhotos();
  }, []);
  useEffect(() => {
    console.log("Pdf photos ---", pdfPhotos);

  }, [pdfPhotos]);
  const getContent = (task: any, index: number) => {
    var photoArray: any = [];
    const imageSrc = cnvrtImgUrl(task?.photo?.photo);

    photoArray[0] = photo_gallery=='true'?pdfPhotos[index] :selectedTaskPhotos[index];
    return (
      <div
        key={index}
        className={`pdf_image_row ${styles.pdf_image_row}`}
        data-image_id="{{ image.id }}"
      >
        <div
          className={`container-fluid pdf_image_row_table px-0 ${styles.pdf_image_row_table}`}
        >
          <div className="row justify-content-center mb-4">
            <div
              className={`col col-6 pdf_image_row_table_td1 ${styles.pdf_image_row_table_td1}`}
            >
              <img
                src={imageSrc}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  transform: `rotate(${task?.angle}deg)`,
                }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-6 px-3 order-lg-2">
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
                      Longtiude
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
                  <td>
                    <label title="{{ pht_alt }}">{} m</label>
                  </td>
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
                      Vetical angle
                    </label>
                  </td>
                  <td>
                    <label title="{{ pht_angle }}">{}</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="dark" title="{{ pht_note_title }}">
                      Note
                    </label>
                  </td>
                  <td>
                    <label title="{{ pht_note }}">{task?.photo?.note}</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="dark" title="{{ pht_device_title }}">
                      Device
                    </label>
                  </td>
                  <td>
                    <label title="{{ pht_device }}">{}</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="dark" title="{{ pht_accuracy_title }}">
                      Accuracy
                    </label>
                  </td>
                  <td>
                    <label title="{{ pht_accuracy }}"> {} m</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="dark" title="{{ pht_distance_title }}">
                      Distance
                    </label>
                  </td>
                  <td>
                    <label title="{{ pht_distance }}"> {} m</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label
                      className="dark"
                      title="{{ pht_distance_nmea_title }}"
                    >
                      Distance
                    </label>
                  </td>
                  <td>
                    <label title="{{ pht_distance_nmea }}"> {} m</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="dark" title="{{ pht_timestamp_title }}">
                      Distance (GNSS)
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
                      Timestamp (UTC)
                    </label>
                  </td>
                  <td>
                    <label title="{{ pht_created_date }}">{}</label>
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
                      {" "}
                      {task?.photo?.created}{" "}
                    </label>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <label></label>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <label></label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-12 col-lg-6 order-lg-1  mb-4">
            <Map
              map_tasks_array={photoArray}
              className="map h-100"
              style={{ width: "100%", minHeight: "500px" }}
            />
          </div>
        </div>
      </div>
    );
  };

  async function handleGenerate() {
    setIsGenerated((values) => ({ ...values, generate: true }));
  }

  if (isLoading&&photo_gallery=='true') {
    return (
      <div style={{backgroundColor:'#fffffffc',height:'100vh'}}>
      <div className="pdf_loader">
        <div className="inner_cont">
          <img src="/tail-spin.svg" className="my-3" alt="spinner_loader" />
          <p>Loading ...</p>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div
      className={styles.container}
      style={{ height: selectedTaskPhotos.length > 0 ? "auto" : "100vh" }}
    >
      {isGenerate.generate ? (
        <ClientPdfRenderer
          selected={selected}
          isPhotoGallery={photo_gallery}
          setIsGenerated={setIsGenerated}
          length={isGenerate.length}
          data={pdfPhotos}
          totalPages={length}
        />
      ) : (
        <>
          <h2>Generating of PDF document</h2>
          <div className="w-100 py-2">
            <button
              id="js_confirm_pdf_generate"
              type="button"
              className="btn btn-primary text-capitalize"
              onClick={handleGenerate}
            >
              Generate
            </button>
          </div>
          {/* Implement mapping here */}
          {photo_gallery == "true"
            ? pdfPhotos?.map(function (task: any, index: number) {
              console.log('pdf',task)
                if (selected == "true") {
                  if (task?.check||photo_gallery=='true') {
                    return getContent(task, index);
                  }
                } else {
                  return getContent(task, index);
                }
              })
            : selectedTaskPhotos?.map(function (task: any, index: number) {
                if (selected == "true") {
                  if (task?.check) {
                    return getContent(task, index);
                  }
                } else {
                  return getContent(task, index);
                }
              })}
        </>
      )}
    </div>
  );
};

export default PdfPreview;
