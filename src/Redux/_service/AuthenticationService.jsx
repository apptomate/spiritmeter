//Logout
export function logout() {
  localStorage.clear();
  window.location.href = "/login";
}
//Logged Token Details
export function loggedTokenDetails() {
  let authToken = localStorage.getItem("authToken");
  return authToken;
}
//Logged User Details
export function loggedUserDetails() {
  let sessionData = localStorage.getItem("loggedUser");
  sessionData = JSON.parse(sessionData) || {};
  return sessionData;
}
