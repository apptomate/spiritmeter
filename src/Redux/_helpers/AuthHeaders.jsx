export function authHeader() {
  const authToken = localStorage.getItem("authToken");
  return { Authorization: `Bearer ${authToken}` };
}
