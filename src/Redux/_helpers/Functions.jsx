/*global google*/
import { message } from "antd";
//Active Current Selected Menu
export function getCurrentActiveMenu(urlPath) {
  const menuKeyObject = {
    dashboard: ["dashboard", "/"],
    display: ["display", "viewDisplay"],
    routes: ["routes", "viewRoute"],
    users: ["users", "viewUser"]
  };
  return Object.keys(menuKeyObject).find(key =>
    menuKeyObject[key].includes(urlPath)
  );
}

export const getLatLng = (data = "") => {
  const [lat, lng] = data.split(",");
  return [parseFloat(lat), parseFloat(lng)];
};

export const getWayPoints = (data = "") => {
  let result = [];
  const points = data.split("|");
  result = points.map(point => ({
    stopover: true,
    location: new google.maps.LatLng(...getLatLng(point))
  }));
  return result;
};

export const getWayPointsLatLng = (data = "") => {
  let result = [];
  const points = data.split("|");
  result = points.map(point => getLatLng(point));
  return result;
};

//Get miles from legs
export const getMilesFromLegs = (legs = []) =>
  convertMetreToMiles(legs.reduce((a, e) => a + e.distance.value, 0));

export const convertMetreToMiles = (num = 0) => num / 1609.344;

export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}
