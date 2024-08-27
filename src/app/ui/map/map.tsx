"use client";
import { useRef, useEffect, memo } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import styles from "./map.module.css";
import ToggleControl from "../dashboard/farmers_tasks/toggle_control/toggle_control";
import { createRoot } from "react-dom/client";
import TaskPhoto from "../dashboard/farmers_tasks/task_photo/task_photo";

const Map = ({
  map_tasks_array,
  onClick,
  style,
  className,
  setIsMapLoad,
}: any) => {
  //Refs
  const mapNode = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>([]);
  const toggleControl = new ToggleControl();

  //UseEffect
  useEffect(() => {
    markerRef.current = [];
    loadMapBox();

    return () => {
      mapRef.current = null;
    };
  }, [map_tasks_array]);

  useEffect(() => {
    loadMapBox();
    return () => {
      mapRef.current = null;
    };
  }, []);

  //Functions

  const loadMapBox = () => {
    if (mapRef.current) {
      mapRef.current.remove();
    }

    if (mapNode.current) {
      mapNode.current.innerHTML = "";
    }
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;
    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0.166022, 51.288998],
      zoom: 2.7,
      preserveDrawingBuffer: setIsMapLoad != undefined && true, 
    });
    const bounds:any = [
      [-180, -85], 
      [180, 85], 
    ];
        mapboxMap.setMaxBounds(bounds);
    if (setIsMapLoad != undefined) {
      mapboxMap.on("load", () => {
        setTimeout(() => {
          setIsMapLoad(true);
        }, 3000);
      });
    }

    if (map_tasks_array.length > 0) {
      mapRef.current = mapboxMap;
      // ref.current=mapboxMap
      //Get all coordinates from tasks
      const coordintates = map_tasks_array.map((task: any) => task.location);
      //Calculate bounding
      let bounds = calculateBoundingBox(coordintates);

      mapboxMap.on("load", () => {
        mapboxMap.addControl(toggleControl, "top-left");
        mapboxMap.addControl(new mapboxgl.NavigationControl());

        //Setup markers
        map_tasks_array.forEach((task: any) => {
          addMarkers(task);
        });

        if (map_tasks_array.length == 1) {
          mapboxMap.fitBounds(bounds, {
            padding: { top: 60, bottom: 60, left: 20, right: 20 },
            duration: 0,
            linear: true,
            zoom: 16,
          });
          insertMarkers();
        } else {
          mapboxMap.fitBounds(bounds, {
            padding: { top: 60, bottom: 60, left: 20, right: 20 },
            duration: 0,
            linear: true,
          });
          // Handle image change based on zoom level
          mapboxMap.on("zoom", () => {
            updateUnclusteredIcon(mapboxMap);
          });

          // Load your custom image
          mapboxMap.loadImage(
            "/group_marker/m5.png",
            function (error, image: any) {
              if (error) throw error;
              mapboxMap.addImage("m5", image);
            }
          );

          const markerImages: any = {
            "data checked": "/map_marker/marker_datachecked_1.png",
            "data provided": "/map_marker/marker_dataprovided.png",
            new: "/map_marker/marker_new.png",
            open: "/map_marker/marker_open.png",
            returns: "/map_marker/marker_returned.png",
            unassigned: "/map_marker/marker_unassigned.png",
          };

          // Load all marker images and add them to the map
          const loadImagePromises = Object.keys(markerImages).map(
            (status: any) =>
              new Promise((resolve, reject) => {
                mapboxMap.loadImage(
                  markerImages[status],
                  (error, image: any) => {
                    if (error) {
                      reject(error);
                    } else {
                      mapboxMap.addImage(`marker-${status}`, image);
                      resolve("success");
                    }
                  }
                );
              })
          );

          Promise.all(loadImagePromises).then(() => {
            mapboxMap.addSource("tasks_photos", {
              type: "geojson",
              // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
              // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
              data: {
                type: "FeatureCollection",
                features: map_tasks_array.map((task: any) => ({
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: task.location,
                  },
                  properties: {
                    id: task.id,
                    status: task.status,
                    location: task.location,
                  },
                })),
              },
              cluster: true,
              clusterMaxZoom: 14, // Max zoom to cluster points on
              clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
            });

            mapboxMap.addLayer({
              id: "clusters",
              type: "symbol",
              source: "tasks_photos",
              filter: ["has", "point_count"],
              layout: {
                visibility: "visible",
                "icon-allow-overlap": true,
                "icon-image": "m5",
                "icon-size": 0.5,
                "text-field": ["get", "point_count_abbreviated"],
                "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                "text-size": 12,
              },
            });

            mapboxMap.addLayer({
              id: "unclustered-point",
              type: "symbol",
              source: "tasks_photos",
              filter: ["!", ["has", "point_count"]],
              layout: {
                visibility: "visible",
                "icon-allow-overlap": true,
                "icon-image": ["concat", "marker-", ["get", "status"]],
              },
            });

            mapboxMap.on("mouseenter", "unclustered-point", () => {
              mapboxMap.getCanvas().style.cursor = "pointer";
            });

            mapboxMap.on("mouseleave", "unclustered-point", () => {
              mapboxMap.getCanvas().style.cursor = "";
            });

            // handle zoom level

            // Handle image change based on zoom level
            mapboxMap.on("zoom", () => {
              updateUnclusteredIcon(mapboxMap);
            });

            // inspect a cluster on click
            mapboxMap.on("click", "clusters", (e) => {
              const features: any = mapboxMap.queryRenderedFeatures(e.point, {
                layers: ["clusters"],
              });

              const clusterId = features[0].properties.cluster_id;
              mapboxMap
                .getSource("tasks_photos")
                ?.getClusterExpansionZoom(clusterId, (err: any, zoom: any) => {
                  if (err) return;

                  mapboxMap.jumpTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom,
                  });
                });
            });

            mapboxMap.on("click", "unclustered-point", (e: any) => {
              // Ensure that the unclustered points may appear on the screen
              const coordinates = JSON.parse(e.features[0].properties.location);
              mapboxMap.jumpTo({
                center: coordinates,
                zoom: 16, // Specify your zoom level here
              });
            });

            mapboxMap.on("mouseenter", "clusters", () => {
              mapboxMap.getCanvas().style.cursor = "pointer";
            });
            mapboxMap.on("mouseleave", "clusters", () => {
              mapboxMap.getCanvas().style.cursor = "";
            });
          });
        }
      });
    }
    return mapboxMap;
  };

  const addMarkers = (data: any) => {
    const el = document.createElement("div");
    const root = createRoot(el);
    root.render(<TaskPhoto data={data} onClick={onClick} />);
    const marker = new mapboxgl.Marker(el).setLngLat(data?.location);

    // Store marker instance
    markerRef.current.push(marker);
  };

  const updateUnclusteredIcon = (map: any) => {
    const zoomLevel = map.getZoom();
    if (zoomLevel > 15) {
      insertMarkers();
      map.setLayoutProperty("unclustered-point", "visibility", "none");
    } else {
      // Remove markers if they are currently added
      map.setLayoutProperty("unclustered-point", "visibility", "visible");
      markerRef.current.forEach((marker: any) => {
        if (marker.getElement().parentElement) {
          marker.remove();
        }
      });
    }
  };

  //Add markers functions
  function insertMarkers() {
    try{
      markerRef.current.forEach((marker: any) => {
        if (!marker.getElement().parentElement) {
          marker.addTo(mapRef.current);
        }
      });
    }catch(err){
      
    }

  }

  // Function to calculate bounding box
  const calculateBoundingBox = (coordinates: any) => {
    let bounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]);
    coordinates.forEach((coord: any) => {
      bounds.extend(coord);
    });
    return bounds;
  };

  return <div ref={mapNode} className={className} style={style} />;
};

export default memo(Map);
