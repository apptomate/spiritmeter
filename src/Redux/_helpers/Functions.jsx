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
