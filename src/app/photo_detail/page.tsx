"use client";
import styles from "@/app/ui/photo_detail/dashboard.module.css";
import useLocalStorage from "@/hooks/useLocalStorage";
import { cnvrtImgUrl } from "@/utils/helpers";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState,useRef } from "react";

const PhotoDetail = () => {
  //Params
  const searchParams = useSearchParams();
  const index: any = searchParams.get("index");
  const [selectedTaskPhotos, setSelectedTasksPhoto] = useLocalStorage(
    "tasksPhotos",
    []
  );
  const imageSrc = cnvrtImgUrl(selectedTaskPhotos[0]?.photo?.photo);
  const [image, setImage] = useState<any>(null);
  const [imageWidth, setImageWidth] = useState<any>("auto");
  const [initialWidth, setInitialWidth] = useState(null);

  const imgRef = useRef<any>(null);

  useEffect(() => {
    setImage(imageSrc);
  }, [imageSrc]);

  // Event Handlers
  const handleZoomIn = () => {
    setImageWidth((prevWidth:any) => {
      if (prevWidth === "auto") {
        return 100; // Initialize with 100px on first zoom in
      }
      return parseInt(prevWidth) + 100;
    });
  };

  // Capture initial width when image loads
  const handleImageLoad = () => {
    if (imgRef.current) {
      const actualWidth = imgRef.current.naturalWidth;
      setInitialWidth(actualWidth);
      setImageWidth(actualWidth);
    }
  };

  const handleZoomOut = () => {
    setImageWidth((prevWidth:any) => {
      if (prevWidth === "auto") {
        return 0; // Prevents zoom out from 'auto' state
      }
      return Math.max(100, parseInt(prevWidth) - 100); // At least 100px
    });
  };

  const handleResetZoom = () => {
    setImageWidth(initialWidth);
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          position: "fixed",
          zIndex: "100",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.6)",
            padding: "20px 40px",
            borderRadius: "10px 10px 0 0",
            boxShadow: "0 0 3px",
            display: "flex",
          }}
        >
          <button className={styles.button} id="zoomin" onClick={handleZoomIn}>
            Zoom in
          </button>
          <button
            className={styles.button}
            id="zoomout"
            onClick={handleZoomOut}
          >
            Zoom out
          </button>
          <button
            className={styles.button}
            id="zoomreset"
            onClick={handleResetZoom}
          >
            Reset zoom
          </button>
        </div>
      </div>

      <div
        style={{
          display: "table",
          textAlign: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%"
          }}
        >
          <img
            id="zoombox"
            ref={imgRef}
            style={{
              marginTop: "1%",
              marginBottom: "1%",
              width: imageWidth === "auto" ? "auto" : `${imageWidth}px`,
              transition: "width 0.2s ease", // Smooth transition
            }}
            onLoad={handleImageLoad}
            src={image}
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;
