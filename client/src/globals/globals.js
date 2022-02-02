const jwt = () => {
  if (localStorage.getItem("user") === "null" || !localStorage.getItem("user"))
    return "";
  if (localStorage.getItem("user") !== "null") {
    const { token } = JSON.parse(localStorage.getItem("user"));
    return token;
  }
};
export const BASE_URL = "";
export const config = {
  "Content-Type": "application/json",
  Authorization: jwt(),
};
