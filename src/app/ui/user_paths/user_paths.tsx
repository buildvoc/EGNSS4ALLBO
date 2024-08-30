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
import { JSONParser } from "formidable/parsers";

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




//   let points= [
//     {
//         "id": "30763",
//         "lat": "51.217589112978",
//         "lng": "-0.58020941913182",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:52:50"
//     },
//     {
//         "id": "30764",
//         "lat": "51.217581297803",
//         "lng": "-0.58021784493879",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:52:51"
//     },
//     {
//         "id": "30765",
//         "lat": "51.21757510615",
//         "lng": "-0.58023070919781",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:52:52"
//     },
//     {
//         "id": "30766",
//         "lat": "51.217565562802",
//         "lng": "-0.58024118011603",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:52:53"
//     },
//     {
//         "id": "30767",
//         "lat": "51.217557458311",
//         "lng": "-0.58025310566768",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:52:54"
//     },
//     {
//         "id": "30768",
//         "lat": "51.217550116692",
//         "lng": "-0.58026629065074",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:52:55"
//     },
//     {
//         "id": "30769",
//         "lat": "51.217545255657",
//         "lng": "-0.58028634751366",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:52:56"
//     },
//     {
//         "id": "30770",
//         "lat": "51.217542472121",
//         "lng": "-0.58030494562896",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:52:57"
//     },
//     {
//         "id": "30771",
//         "lat": "51.217537199553",
//         "lng": "-0.58032571421908",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:52:58"
//     },
//     {
//         "id": "30772",
//         "lat": "51.217525452917",
//         "lng": "-0.58033688275829",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:52:59"
//     },
//     {
//         "id": "30773",
//         "lat": "51.21751529248",
//         "lng": "-0.58034825488355",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:00"
//     },
//     {
//         "id": "30774",
//         "lat": "51.217502904868",
//         "lng": "-0.58035351758991",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:01"
//     },
//     {
//         "id": "30775",
//         "lat": "51.21749042365",
//         "lng": "-0.580360033893",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:02"
//     },
//     {
//         "id": "30776",
//         "lat": "51.217478388058",
//         "lng": "-0.5803648489459",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:03"
//     },
//     {
//         "id": "30777",
//         "lat": "51.217466682839",
//         "lng": "-0.5803683819923",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:04"
//     },
//     {
//         "id": "30778",
//         "lat": "51.21745104398",
//         "lng": "-0.58037478482069",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:05"
//     },
//     {
//         "id": "30779",
//         "lat": "51.217437711868",
//         "lng": "-0.58038220073859",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:06"
//     },
//     {
//         "id": "30780",
//         "lat": "51.217424782394",
//         "lng": "-0.58039096184754",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:07"
//     },
//     {
//         "id": "30781",
//         "lat": "51.217412452876",
//         "lng": "-0.58039750283551",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:08"
//     },
//     {
//         "id": "30782",
//         "lat": "51.217398239977",
//         "lng": "-0.58040154991773",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:09"
//     },
//     {
//         "id": "30783",
//         "lat": "51.217384051068",
//         "lng": "-0.58040505984301",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:10"
//     },
//     {
//         "id": "30784",
//         "lat": "51.217340872681",
//         "lng": "-0.58043457781112",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:11"
//     },
//     {
//         "id": "30785",
//         "lat": "51.217328060465",
//         "lng": "-0.5804392710175",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:12"
//     },
//     {
//         "id": "30786",
//         "lat": "51.217309757512",
//         "lng": "-0.58044878971382",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:13"
//     },
//     {
//         "id": "30787",
//         "lat": "51.2172986228",
//         "lng": "-0.58045757650918",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:14"
//     },
//     {
//         "id": "30788",
//         "lat": "51.217284528891",
//         "lng": "-0.58045521445981",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:15"
//     },
//     {
//         "id": "30789",
//         "lat": "51.217272174508",
//         "lng": "-0.58044964174608",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:16"
//     },
//     {
//         "id": "30790",
//         "lat": "51.21726061115",
//         "lng": "-0.58044367962501",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:17"
//     },
//     {
//         "id": "30791",
//         "lat": "51.217251587587",
//         "lng": "-0.58043733348859",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:18"
//     },
//     {
//         "id": "30792",
//         "lat": "51.217235302192",
//         "lng": "-0.58043220133178",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:19"
//     },
//     {
//         "id": "30793",
//         "lat": "51.217218070469",
//         "lng": "-0.58043099450532",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:20"
//     },
//     {
//         "id": "30794",
//         "lat": "51.217203885359",
//         "lng": "-0.58043043273397",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:21"
//     },
//     {
//         "id": "30795",
//         "lat": "51.217190174444",
//         "lng": "-0.58043750767412",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:22"
//     },
//     {
//         "id": "30796",
//         "lat": "51.217171307685",
//         "lng": "-0.58044404497574",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:23"
//     },
//     {
//         "id": "30797",
//         "lat": "51.217152922024",
//         "lng": "-0.58044015633988",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:24"
//     },
//     {
//         "id": "30798",
//         "lat": "51.217141127708",
//         "lng": "-0.58043998327391",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:25"
//     },
//     {
//         "id": "30799",
//         "lat": "51.21712911073",
//         "lng": "-0.58043331480564",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:26"
//     },
//     {
//         "id": "30800",
//         "lat": "51.217119127408",
//         "lng": "-0.58043540338118",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:27"
//     },
//     {
//         "id": "30801",
//         "lat": "51.217106615741",
//         "lng": "-0.58044181093923",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:28"
//     },
//     {
//         "id": "30802",
//         "lat": "51.217093779882",
//         "lng": "-0.58044658389205",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:29"
//     },
//     {
//         "id": "30803",
//         "lat": "51.217075272928",
//         "lng": "-0.58044468553031",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:30"
//     },
//     {
//         "id": "30804",
//         "lat": "51.217057318176",
//         "lng": "-0.58044402001544",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:31"
//     },
//     {
//         "id": "30805",
//         "lat": "51.217038871552",
//         "lng": "-0.5804455793323",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:32"
//     },
//     {
//         "id": "30806",
//         "lat": "51.217028373518",
//         "lng": "-0.5804363215071",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:33"
//     },
//     {
//         "id": "30807",
//         "lat": "51.217018862837",
//         "lng": "-0.58043532777913",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:34"
//     },
//     {
//         "id": "30808",
//         "lat": "51.21700575673",
//         "lng": "-0.58044281662776",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:35"
//     },
//     {
//         "id": "30809",
//         "lat": "51.216990019049",
//         "lng": "-0.58044917190819",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:36"
//     },
//     {
//         "id": "30810",
//         "lat": "51.216975186141",
//         "lng": "-0.58044974381426",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:37"
//     },
//     {
//         "id": "30811",
//         "lat": "51.216962277736",
//         "lng": "-0.58045861965919",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:38"
//     },
//     {
//         "id": "30812",
//         "lat": "51.216950367705",
//         "lng": "-0.58046465127862",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:39"
//     },
//     {
//         "id": "30813",
//         "lat": "51.216937595422",
//         "lng": "-0.58046221995422",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:40"
//     },
//     {
//         "id": "30814",
//         "lat": "51.216926162304",
//         "lng": "-0.58046304092948",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:41"
//     },
//     {
//         "id": "30815",
//         "lat": "51.216915230442",
//         "lng": "-0.58046638719504",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:42"
//     },
//     {
//         "id": "30816",
//         "lat": "51.216891443979",
//         "lng": "-0.58046794504644",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:43"
//     },
//     {
//         "id": "30817",
//         "lat": "51.216879354001",
//         "lng": "-0.58045818158707",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:44"
//     },
//     {
//         "id": "30818",
//         "lat": "51.216872827207",
//         "lng": "-0.58045395325798",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:45"
//     },
//     {
//         "id": "30819",
//         "lat": "51.216869010524",
//         "lng": "-0.58045014105753",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:46"
//     },
//     {
//         "id": "30820",
//         "lat": "51.216862845452",
//         "lng": "-0.58044250191094",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:47"
//     },
//     {
//         "id": "30821",
//         "lat": "51.216860991034",
//         "lng": "-0.580441211854",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:48"
//     },
//     {
//         "id": "30822",
//         "lat": "51.216855927496",
//         "lng": "-0.58044133147511",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:49"
//     },
//     {
//         "id": "30823",
//         "lat": "51.216846315051",
//         "lng": "-0.58045021761466",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:50"
//     },
//     {
//         "id": "30824",
//         "lat": "51.216838048891",
//         "lng": "-0.5804517155279",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:51"
//     },
//     {
//         "id": "30825",
//         "lat": "51.216827406671",
//         "lng": "-0.58044987441246",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:52"
//     },
//     {
//         "id": "30826",
//         "lat": "51.216810011694",
//         "lng": "-0.58046014699272",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:53"
//     },
//     {
//         "id": "30827",
//         "lat": "51.21679874746",
//         "lng": "-0.58046004228555",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:54"
//     },
//     {
//         "id": "30828",
//         "lat": "51.216785859792",
//         "lng": "-0.58047198046398",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:55"
//     },
//     {
//         "id": "30829",
//         "lat": "51.216776795386",
//         "lng": "-0.58047598560175",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:56"
//     },
//     {
//         "id": "30830",
//         "lat": "51.216773646593",
//         "lng": "-0.580487113242",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-03-01 07:53:57"
//     }
// ]




//   let points = [
//     {
//         "id": "30748",
//         "lat": "21.235924939739",
//         "lng": "72.824727532326",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-02-28 10:20:18"
//     },
//     {
//         "id": "30749",
//         "lat": "21.235974901693",
//         "lng": "72.824700093454",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-02-28 10:20:24"
//     },
//     {
//         "id": "30750",
//         "lat": "21.235971488366",
//         "lng": "72.824747572357",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-02-28 10:20:26"
//     },
//     {
//         "id": "30751",
//         "lat": "21.235920873248",
//         "lng": "72.824630702498",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-02-28 10:20:32"
//     },
//     {
//         "id": "30752",
//         "lat": "21.23592130659",
//         "lng": "72.824667234697",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-02-28 10:20:32"
//     },
//     {
//         "id": "30753",
//         "lat": "21.235923502809",
//         "lng": "72.824675746692",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-02-28 10:20:34"
//     },
//     {
//         "id": "30754",
//         "lat": "21.235907036531",
//         "lng": "72.824609180906",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-02-28 10:20:40"
//     },
//     {
//         "id": "30755",
//         "lat": "21.235920906951",
//         "lng": "72.824676445245",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-02-28 10:20:40"
//     },
//     {
//         "id": "30756",
//         "lat": "21.235920624297",
//         "lng": "72.824672705243",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-02-28 10:20:41"
//     },
//     {
//         "id": "30757",
//         "lat": "21.235910537035",
//         "lng": "72.824612156688",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-02-28 10:20:47"
//     },
//     {
//         "id": "30758",
//         "lat": "21.235914574739",
//         "lng": "72.824748551431",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-02-28 10:20:48"
//     },
//     {
//         "id": "30759",
//         "lat": "21.235923926981",
//         "lng": "72.824830314623",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-02-28 10:20:49"
//     },
//     {
//         "id": "30760",
//         "lat": "21.235913501459",
//         "lng": "72.824660146533",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-02-28 10:20:55"
//     },
//     {
//         "id": "30761",
//         "lat": "21.235923200761",
//         "lng": "72.824650063073",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-02-28 10:20:55"
//     },
//     {
//         "id": "30762",
//         "lat": "21.235911306219",
//         "lng": "72.824584154643",
//         "altitude": null,
//         "accuracy": null,
//         "created": "2024-02-28 10:21:01"
//     }
// ]




  let points =[
    {
        "id": "30641",
        "lat": "51.2192122",
        "lng": "-0.7943523",
        "altitude": "131.8",
        "accuracy": "5.298",
        "created": "2024-02-19 20:27:51"
    },
    {
        "id": "30642",
        "lat": "51.2192126",
        "lng": "-0.794352",
        "altitude": "132.1",
        "accuracy": "5.448",
        "created": "2024-02-19 20:27:53"
    },
    {
        "id": "30643",
        "lat": "51.2192127",
        "lng": "-0.7943518",
        "altitude": "132.1",
        "accuracy": "5.462",
        "created": "2024-02-19 20:27:54"
    },
    {
        "id": "30644",
        "lat": "51.2192133",
        "lng": "-0.7943506",
        "altitude": "132.1",
        "accuracy": "5.476",
        "created": "2024-02-19 20:27:55"
    },
    {
        "id": "30645",
        "lat": "51.2192134",
        "lng": "-0.7943494",
        "altitude": "132.1",
        "accuracy": "5.491",
        "created": "2024-02-19 20:27:56"
    },
    {
        "id": "30646",
        "lat": "51.2192135",
        "lng": "-0.7943489",
        "altitude": "132.1",
        "accuracy": "5.773",
        "created": "2024-02-19 20:27:57"
    },
    {
        "id": "30647",
        "lat": "51.2192135",
        "lng": "-0.7943485",
        "altitude": "133.6",
        "accuracy": "5.619",
        "created": "2024-02-19 20:27:58"
    },
    {
        "id": "30648",
        "lat": "51.2192144",
        "lng": "-0.7943461",
        "altitude": "133.6",
        "accuracy": "5.388",
        "created": "2024-02-19 20:27:59"
    },
    {
        "id": "30649",
        "lat": "51.2192203",
        "lng": "-0.7943306",
        "altitude": "133.6",
        "accuracy": "5.619",
        "created": "2024-02-19 20:28:00"
    },
    {
        "id": "30650",
        "lat": "51.2192313",
        "lng": "-0.7942923",
        "altitude": "133.6",
        "accuracy": "5.388",
        "created": "2024-02-19 20:28:01"
    },
    {
        "id": "30651",
        "lat": "51.2192564",
        "lng": "-0.7942239",
        "altitude": "133.6",
        "accuracy": "5.619",
        "created": "2024-02-19 20:28:02"
    },
    {
        "id": "30652",
        "lat": "51.2192838",
        "lng": "-0.7941463",
        "altitude": "132.1",
        "accuracy": "5.684",
        "created": "2024-02-19 20:28:03"
    },
    {
        "id": "30653",
        "lat": "51.2193116",
        "lng": "-0.7940632",
        "altitude": "132.1",
        "accuracy": "5.684",
        "created": "2024-02-19 20:28:04"
    },
    {
        "id": "30654",
        "lat": "51.219341",
        "lng": "-0.7939788",
        "altitude": "132.1",
        "accuracy": "5.684",
        "created": "2024-02-19 20:28:05"
    },
    {
        "id": "30655",
        "lat": "51.2193721",
        "lng": "-0.7938926",
        "altitude": "132.1",
        "accuracy": "5.684",
        "created": "2024-02-19 20:28:06"
    },
    {
        "id": "30656",
        "lat": "51.2194028",
        "lng": "-0.7938079",
        "altitude": "132.1",
        "accuracy": "5.443",
        "created": "2024-02-19 20:28:07"
    },
    {
        "id": "30657",
        "lat": "51.2194332",
        "lng": "-0.7937257",
        "altitude": "132.1",
        "accuracy": "4",
        "created": "2024-02-19 20:28:08"
    },
    {
        "id": "30658",
        "lat": "51.2194674",
        "lng": "-0.7936401",
        "altitude": "132.1",
        "accuracy": "4",
        "created": "2024-02-19 20:28:09"
    },
    {
        "id": "30659",
        "lat": "51.2195062",
        "lng": "-0.7935471",
        "altitude": "132.1",
        "accuracy": "4",
        "created": "2024-02-19 20:28:10"
    },
    {
        "id": "30660",
        "lat": "51.2195455",
        "lng": "-0.7934518",
        "altitude": "132.1",
        "accuracy": "4",
        "created": "2024-02-19 20:28:11"
    },
    {
        "id": "30661",
        "lat": "51.2195823",
        "lng": "-0.793359",
        "altitude": "132.1",
        "accuracy": "4",
        "created": "2024-02-19 20:28:12"
    },
    {
        "id": "30662",
        "lat": "51.2196149",
        "lng": "-0.7932661",
        "altitude": "132.1",
        "accuracy": "4",
        "created": "2024-02-19 20:28:13"
    },
    {
        "id": "30663",
        "lat": "51.2196422",
        "lng": "-0.7931713",
        "altitude": "132.1",
        "accuracy": "4",
        "created": "2024-02-19 20:28:14"
    },
    {
        "id": "30664",
        "lat": "51.2196605",
        "lng": "-0.7930779",
        "altitude": "132.1",
        "accuracy": "4",
        "created": "2024-02-19 20:28:15"
    },
    {
        "id": "30665",
        "lat": "51.2196726",
        "lng": "-0.7929901",
        "altitude": "132.1",
        "accuracy": "4",
        "created": "2024-02-19 20:28:16"
    },
    {
        "id": "30666",
        "lat": "51.219682",
        "lng": "-0.7929064",
        "altitude": "132.1",
        "accuracy": "4",
        "created": "2024-02-19 20:28:17"
    },
    {
        "id": "30667",
        "lat": "51.2196873",
        "lng": "-0.792824",
        "altitude": "132.3",
        "accuracy": "4",
        "created": "2024-02-19 20:28:18"
    },
    {
        "id": "30668",
        "lat": "51.2196884",
        "lng": "-0.7927366",
        "altitude": "132.3",
        "accuracy": "4",
        "created": "2024-02-19 20:28:19"
    },
    {
        "id": "30669",
        "lat": "51.2196851",
        "lng": "-0.7926452",
        "altitude": "132.3",
        "accuracy": "4",
        "created": "2024-02-19 20:28:20"
    },
    {
        "id": "30670",
        "lat": "51.2196772",
        "lng": "-0.7925625",
        "altitude": "132.3",
        "accuracy": "4",
        "created": "2024-02-19 20:28:21"
    },
    {
        "id": "30671",
        "lat": "51.2196654",
        "lng": "-0.7924932",
        "altitude": "132.3",
        "accuracy": "4",
        "created": "2024-02-19 20:28:22"
    },
    {
        "id": "30672",
        "lat": "51.2196519",
        "lng": "-0.7924314",
        "altitude": "132.3",
        "accuracy": "4",
        "created": "2024-02-19 20:28:23"
    },
    {
        "id": "30673",
        "lat": "51.219638",
        "lng": "-0.7923705",
        "altitude": "132.3",
        "accuracy": "4",
        "created": "2024-02-19 20:28:24"
    },
    {
        "id": "30674",
        "lat": "51.2196252",
        "lng": "-0.7923119",
        "altitude": "126.4",
        "accuracy": "5.532",
        "created": "2024-02-19 20:28:25"
    },
    {
        "id": "30675",
        "lat": "51.219621",
        "lng": "-0.7922574",
        "altitude": "126.4",
        "accuracy": "5.532",
        "created": "2024-02-19 20:28:26"
    },
    {
        "id": "30676",
        "lat": "51.2196215",
        "lng": "-0.7922076",
        "altitude": "126.4",
        "accuracy": "5.313",
        "created": "2024-02-19 20:28:27"
    },
    {
        "id": "30677",
        "lat": "51.2196395",
        "lng": "-0.7921658",
        "altitude": "126.4",
        "accuracy": "5.313",
        "created": "2024-02-19 20:28:28"
    },
    {
        "id": "30678",
        "lat": "51.2196686",
        "lng": "-0.7921309",
        "altitude": "126.4",
        "accuracy": "5.313",
        "created": "2024-02-19 20:28:29"
    },
    {
        "id": "30679",
        "lat": "51.2197017",
        "lng": "-0.7920929",
        "altitude": "127.5",
        "accuracy": "5.443",
        "created": "2024-02-19 20:28:30"
    },
    {
        "id": "30680",
        "lat": "51.2197375",
        "lng": "-0.792044",
        "altitude": "127.5",
        "accuracy": "5.777",
        "created": "2024-02-19 20:28:31"
    },
    {
        "id": "30681",
        "lat": "51.2197727",
        "lng": "-0.7919795",
        "altitude": "127.5",
        "accuracy": "6.11",
        "created": "2024-02-19 20:28:32"
    },
    {
        "id": "30682",
        "lat": "51.2198024",
        "lng": "-0.7919071",
        "altitude": "127.5",
        "accuracy": "6.094",
        "created": "2024-02-19 20:28:33"
    },
    {
        "id": "30683",
        "lat": "51.2198206",
        "lng": "-0.7918353",
        "altitude": "127.5",
        "accuracy": "6.443",
        "created": "2024-02-19 20:28:34"
    },
    {
        "id": "30684",
        "lat": "51.2198276",
        "lng": "-0.7917689",
        "altitude": "127.5",
        "accuracy": "5",
        "created": "2024-02-19 20:28:35"
    },
    {
        "id": "30685",
        "lat": "51.2198251",
        "lng": "-0.7917024",
        "altitude": "127.5",
        "accuracy": "4.8",
        "created": "2024-02-19 20:28:36"
    },
    {
        "id": "30686",
        "lat": "51.2198105",
        "lng": "-0.7916401",
        "altitude": "127.7",
        "accuracy": "5.816",
        "created": "2024-02-19 20:28:37"
    },
    {
        "id": "30687",
        "lat": "51.2197888",
        "lng": "-0.7915851",
        "altitude": "127.7",
        "accuracy": "5.483",
        "created": "2024-02-19 20:28:38"
    },
    {
        "id": "30688",
        "lat": "51.2197678",
        "lng": "-0.7915381",
        "altitude": "127.7",
        "accuracy": "5.271",
        "created": "2024-02-19 20:28:39"
    },
    {
        "id": "30689",
        "lat": "51.2197545",
        "lng": "-0.7914907",
        "altitude": "127.7",
        "accuracy": "5.483",
        "created": "2024-02-19 20:28:40"
    },
    {
        "id": "30690",
        "lat": "51.2197552",
        "lng": "-0.7914364",
        "altitude": "127.7",
        "accuracy": "5.271",
        "created": "2024-02-19 20:28:41"
    },
    {
        "id": "30691",
        "lat": "51.2197705",
        "lng": "-0.7913775",
        "altitude": "127.5",
        "accuracy": "5.248",
        "created": "2024-02-19 20:28:42"
    },
    {
        "id": "30692",
        "lat": "51.2197908",
        "lng": "-0.791313",
        "altitude": "127.5",
        "accuracy": "5.457",
        "created": "2024-02-19 20:28:43"
    },
    {
        "id": "30693",
        "lat": "51.2198155",
        "lng": "-0.7912416",
        "altitude": "127.5",
        "accuracy": "5.248",
        "created": "2024-02-19 20:28:44"
    },
    {
        "id": "30694",
        "lat": "51.2198412",
        "lng": "-0.7911632",
        "altitude": "127.5",
        "accuracy": "5.248",
        "created": "2024-02-19 20:28:45"
    },
    {
        "id": "30695",
        "lat": "51.2198682",
        "lng": "-0.79108",
        "altitude": "127.5",
        "accuracy": "5.457",
        "created": "2024-02-19 20:28:46"
    },
    {
        "id": "30696",
        "lat": "51.2198982",
        "lng": "-0.7909893",
        "altitude": "127.5",
        "accuracy": "4",
        "created": "2024-02-19 20:28:47"
    },
    {
        "id": "30697",
        "lat": "51.2199302",
        "lng": "-0.7908983",
        "altitude": "127.5",
        "accuracy": "4",
        "created": "2024-02-19 20:28:48"
    },
    {
        "id": "30698",
        "lat": "51.2199629",
        "lng": "-0.7908074",
        "altitude": "127.5",
        "accuracy": "4",
        "created": "2024-02-19 20:28:49"
    },
    {
        "id": "30699",
        "lat": "51.2199955",
        "lng": "-0.7907176",
        "altitude": "127.5",
        "accuracy": "4",
        "created": "2024-02-19 20:28:50"
    },
    {
        "id": "30700",
        "lat": "51.2200269",
        "lng": "-0.7906331",
        "altitude": "127.5",
        "accuracy": "4",
        "created": "2024-02-19 20:28:51"
    },
    {
        "id": "30701",
        "lat": "51.2200578",
        "lng": "-0.7905548",
        "altitude": "127.5",
        "accuracy": "4",
        "created": "2024-02-19 20:28:52"
    },
    {
        "id": "30702",
        "lat": "51.2200924",
        "lng": "-0.7904728",
        "altitude": "127.5",
        "accuracy": "4",
        "created": "2024-02-19 20:28:53"
    },
    {
        "id": "30703",
        "lat": "51.2201302",
        "lng": "-0.7903867",
        "altitude": "127.5",
        "accuracy": "4",
        "created": "2024-02-19 20:28:54"
    },
    {
        "id": "30704",
        "lat": "51.2201711",
        "lng": "-0.7902986",
        "altitude": "127.5",
        "accuracy": "4",
        "created": "2024-02-19 20:28:55"
    },
    {
        "id": "30705",
        "lat": "51.2202091",
        "lng": "-0.7902123",
        "altitude": "127.5",
        "accuracy": "4",
        "created": "2024-02-19 20:28:56"
    },
    {
        "id": "30706",
        "lat": "51.2202458",
        "lng": "-0.7901245",
        "altitude": "127.5",
        "accuracy": "4",
        "created": "2024-02-19 20:28:57"
    },
    {
        "id": "30707",
        "lat": "51.220277",
        "lng": "-0.7900367",
        "altitude": "127.5",
        "accuracy": "4",
        "created": "2024-02-19 20:28:58"
    },
    {
        "id": "30708",
        "lat": "51.2203005",
        "lng": "-0.7899609",
        "altitude": "127.5",
        "accuracy": "4",
        "created": "2024-02-19 20:28:59"
    },
    {
        "id": "30709",
        "lat": "51.2203171",
        "lng": "-0.7899005",
        "altitude": "127.5",
        "accuracy": "4",
        "created": "2024-02-19 20:29:00"
    },
    {
        "id": "30710",
        "lat": "51.2203306",
        "lng": "-0.7898504",
        "altitude": "127.5",
        "accuracy": "4",
        "created": "2024-02-19 20:29:01"
    },
    {
        "id": "30711",
        "lat": "51.2203363",
        "lng": "-0.7898261",
        "altitude": "127.5",
        "accuracy": "4",
        "created": "2024-02-19 20:29:02"
    },
    {
        "id": "30712",
        "lat": "51.2203348",
        "lng": "-0.7898257",
        "altitude": "128.1",
        "accuracy": "5.608",
        "created": "2024-02-19 20:29:03"
    },
    {
        "id": "30713",
        "lat": "51.2203334",
        "lng": "-0.7898297",
        "altitude": "128.1",
        "accuracy": "5.894",
        "created": "2024-02-19 20:29:04"
    },
    {
        "id": "30714",
        "lat": "51.2203329",
        "lng": "-0.7898311",
        "altitude": "128.1",
        "accuracy": "6.18",
        "created": "2024-02-19 20:29:05"
    },
    {
        "id": "30715",
        "lat": "51.2203328",
        "lng": "-0.7898316",
        "altitude": "128.1",
        "accuracy": "6.876",
        "created": "2024-02-19 20:29:06"
    },
    {
        "id": "30716",
        "lat": "51.2203327",
        "lng": "-0.7898317",
        "altitude": "128.1",
        "accuracy": "7.21",
        "created": "2024-02-19 20:29:07"
    },
    {
        "id": "30717",
        "lat": "51.2203327",
        "lng": "-0.7898318",
        "altitude": "129.6",
        "accuracy": "7.163",
        "created": "2024-02-19 20:29:08"
    },
    {
        "id": "30718",
        "lat": "51.2203327",
        "lng": "-0.7898318",
        "altitude": "129.6",
        "accuracy": "7.163",
        "created": "2024-02-19 20:29:09"
    },
    {
        "id": "30719",
        "lat": "51.2203327",
        "lng": "-0.7898318",
        "altitude": "129.6",
        "accuracy": "7.357",
        "created": "2024-02-19 20:29:10"
    }
]

  const data = [
    {
      id: '314',
      name: 'around the corner',
      start: '2024-02-19 20:27:52',
      end: '2024-02-19 20:29:11',
      area: '692.04',
      device_manufacture: 'samsung',
      device_model: 'gtactive3',
      device_platform: 'Android',
      device_version: '13',
      points: points
    },
  ];



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
        style={{ height: "80vh" }}
        className={styles.map_div}
        points={data[0].points}
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
