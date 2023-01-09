import axios from "axios";

const api = axios.create({ baseURL: "https://nc-games.onrender.com/api" });

export const getReviews = () => {
  return api.get("/reviews").then((response) => response.data.reviews);
};
