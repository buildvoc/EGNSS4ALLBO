"use client";
import { useRef, useEffect, memo } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactDOM from "react-dom";
import { loadJQuery } from "@/utils/helpers";

import mapboxgl from "mapbox-gl";
import styles from "./map.module.css";
import ToggleControl from "../dashboard/farmers_tasks/toggle_control/toggle_control";
import { createRoot } from "react-dom/client";
import TaskPhoto from "../dashboard/farmers_tasks/task_photo/task_photo";
import { zIndex } from "html2canvas/dist/types/css/property-descriptors/z-index";
import { opacity } from "html2canvas/dist/types/css/property-descriptors/opacity";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as any;
import CustomPopup from "./CustomPopup";

const Map = ({
  map_tasks_array,
  onClick,
  style,
  className,
  setIsMapLoad,
  points,
}: any) => {
  //Refs
  const mapNode = useRef<any | HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>([]);
  const toggleControl = new ToggleControl();
  const map = useRef<any>(null);

  useEffect(() => {
    markerRef.current = [];
    // loadMapBox();

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

  // Map paths

  function lineIntersect(
    line1Start: any,
    line1End: any,
    line2Start: any,
    line2End: any
  ) {
    const det =
      (line1End[0] - line1Start[0]) * (line2End[1] - line2Start[1]) -
      (line1End[1] - line1Start[1]) * (line2End[0] - line2Start[0]);

    if (det === 0) {
      return null; // lines are parallel
    }

    const lambda =
      ((line2End[1] - line2Start[1]) * (line2End[0] - line1Start[0]) +
        (line2Start[0] - line2End[0]) * (line2End[1] - line1Start[1])) /
      det;
    const gamma =
      ((line1Start[1] - line1End[1]) * (line2End[0] - line1Start[0]) +
        (line1End[0] - line1Start[0]) * (line2End[1] - line1Start[1])) /
      det;

    if (0 < lambda && lambda < 1 && 0 < gamma && gamma < 1) {
      const intersectX = line1Start[0] + lambda * (line1End[0] - line1Start[0]);
      const intersectY = line1Start[1] + lambda * (line1End[1] - line1Start[1]);
      return [intersectX, intersectY];
    }

    return null; // no intersection
  }

  useEffect(() => {
    console.log("Map points ---", points);
    if (points) {
      loadPath();
    } else {
      loadMapBox();
    }
    return () => {
      mapRef.current = null;
    };
  }, [map_tasks_array, points]);

  const loadPath = () => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapNode.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [parseFloat(points[0].lng), parseFloat(points[0].lat)],
      zoom: 18,
    });

    map.current.on("load", () => {
      const coordinates = points.map((point: any) => [
        parseFloat(point.lng),
        parseFloat(point.lat),
      ]);

      // Add the first point at the end to close the loop
      coordinates.push(coordinates[0]);

      // Add a data source containing GeoJSON data.
      map.current.addSource("maine", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            // These coordinates outline Maine.
            coordinates: [coordinates],
          },
        },
      });

      // Add a new layer to visualize the polygon.
      map.current.addLayer({
        id: "maine",
        type: "fill",
        source: "maine", // reference the data source
        layout: {},
        paint: {
          "fill-color": "#9a97f2", // blue color fill
          "fill-opacity": 0.2,
          zIndex: 1,
        },
      });
      // Add a black outline around the polygon.
      map.current.addLayer({
        id: "outline",
        type: "line",
        source: "maine",
        layout: {},
        paint: {
          "line-color": "#0401fc",
          "line-width": 2,
          zIndex: 1,
          opacity: 0.7,
        },
      });

      // Prepare point data for circles
      const pointFeatures = coordinates.map((coord: any) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: coord,
        },
      }));

      // Add a data source containing GeoJSON data for the points.
      map.current.addSource("points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: pointFeatures,
        },
      });

      map.current.addLayer({
        id: "circles",
        type: "circle",
        source: "points",
        layout: {},
        paint: {
          "circle-radius": 5,
          "circle-color": "#0401fc", // red color fill "#0401fc"
          "circle-stroke-width": 1,
          "circle-opacity": 0.8,
          "circle-stroke-color": "#0401fc",
        },
      });

      // Add click event listeners to change colors to yellow
      map.current.on("click", "maine", () => {
        map.current.setPaintProperty("maine", "fill-color", "#ffd219"); // yellow color
        map.current.setPaintProperty("maine", "fill-opacity", 0.7); // yellow color
        map.current.setPaintProperty("outline", "line-color", "#ffd219"); // yellow outline
        map.current.setPaintProperty("circles", "circle-color", "#ffd219"); // yellow circles
        map.current.setPaintProperty(
          "circles",
          "circle-stroke-color",
          "#ffd219"
        ); // yellow circles
      });

      map.current.on("click", "circles", (e: any) => {
        (async ()=>{
          const $ = await loadJQuery();
          $('.mapboxgl-popup-content').removeClass('mapboxgl-popup-content').addClass('cus-mapboxgl-popup-content');
          $('.mapboxgl-popup-close-button').removeClass('mapboxgl-popup-close-button').addClass('cus-mapboxgl-popup-close-button');

        })()

        const coordinates = e.features[0].geometry.coordinates.slice();
        // Render the React component into the DOM element
        const el: any = document.createElement("div");
        const root = createRoot(el);
        root.render(
          <CustomPopup onClose={() => popup.remove()} /> // Pass any props you need
        );

        const popup = new mapboxgl.Popup({maxWidth:"320px"}).setLngLat(coordinates).setDOMContent(el).addTo(map.current)
    
      });

      map.current.on("mouseenter", "maine", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      map.current.on("mouseleave", "maine", () => {
        map.current.getCanvas().style.cursor = "";
      });

      // Click event on the map to detect if the click is outside the polygon
      map.current.on("click", (e: any) => {
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ["maine"], // check for clicks on the 'maine' polygon
        });

        if (!features.length) {
          // If no features are returned, the click was outside the polygon
          map.current.setPaintProperty("maine", "fill-color", "#9a97f2"); // reset to initial color
          map.current.setPaintProperty("outline", "line-color", "#0401fc"); // reset outline to initial color
          map.current.setPaintProperty("circles", "circle-color", "#0401fc"); // yellow circles
          map.current.setPaintProperty(
            "circles",
            "circle-stroke-color",
            "#0401fc"
          ); // yellow circles
        }
      });

      // Get the first point of the polygon
      let firstPoint = coordinates[0];

      // Adjust the latitude of the first point to move the text box
      const adjustedLatitude = firstPoint[1] + 0.0003; // Shift up by 0.001 degrees
      firstPoint = [firstPoint[0], adjustedLatitude]; // Update the first point with the new latitude

      // Create a custom HTML element (a simple text box)
      const textBox = document.createElement("div");
      textBox.textContent = "Your Text Here"; // Set your desired text
      textBox.style.backgroundColor = "white"; // White background
      textBox.style.border = "1px solid #ccc"; // Light grey border
      textBox.style.padding = "5px"; // Padding inside the box
      textBox.style.borderRadius = "3px"; // Rounded corners
      textBox.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)"; // Subtle shadow

      // Create a marker using the custom HTML element
      const marker = new mapboxgl.Marker({
        element: textBox, // Use the custom div element
        anchor: "bottom", // Position marker relative to the element
      })
        .setLngLat(firstPoint) // Position at the first point
        .addTo(map.current); // Add to the map
    });
  };

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
    const bounds: any = [
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
    try {
      markerRef.current.forEach((marker: any) => {
        if (!marker.getElement().parentElement) {
          marker.addTo(mapRef.current);
        }
      });
    } catch (err) {}
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
