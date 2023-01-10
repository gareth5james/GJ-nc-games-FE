import axios from "axios";

const api = axios.create({ baseURL: "https://nc-games.onrender.com/api" });

export const getReviews = () => {
  return api.get("/reviews").then((response) => response.data.reviews);
};

export const getSingleReview = (reviewId) => {
  return api
    .get(`/reviews/${reviewId}`)
    .then((response) => response.data.review);
};

export const getComments = ({ reviewId }) => {
  return api
    .get(`/reviews/${reviewId}/comments`)
    .then((response) => response.data.comments);
};

export const patchReviewVotes = (reviewId, incVotes) => {
  return api
    .patch(`/reviews/${reviewId}`, incVotes)
    .then((response) => response.data.review.votes);
};

export const getReviewsByCategory = (category) => {
  return api
    .get(`/reviews?category=${category}`)
    .then((response) => response.data.reviews);
};

export const getCategories = () => {
  return api.get(`/categories`).then((response) => response.data.categories);
};
