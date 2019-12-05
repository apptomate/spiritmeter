export const AuthenticationService = {
  logout
};
//Logout
function logout() {
  localStorage.clear();
  window.location.href = "/login";
}
