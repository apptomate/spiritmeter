/*global google*/

//Active Current Selected Menu
export function getCurrentActiveMenu(urlPath) {
  const menuKeyObject = {
    dashboard: ['dashboard', '/'],
    display: ['display', 'viewDisplay'],
    routes: ['routes', 'viewRoute'],
    users: ['users', 'viewUser']
  };
  return Object.keys(menuKeyObject).find(key =>
    menuKeyObject[key].includes(urlPath)
  );
}

export const getLatLng = (data = '') => {
  const [lat, lng] = data.split(',');
  return [parseFloat(lat), parseFloat(lng)];
};

export const getWayPoints = (data = '') => {
  let result = [];
  const points = data.split('|');
  result = points.map(point => ({
    stopover: true,
    location: new google.maps.LatLng(...getLatLng(point))
  }));
  return result;
};
