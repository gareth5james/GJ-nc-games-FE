import axios from "axios";

const api = axios.create({ baseURL: "https://nc-games.onrender.com/api" });

export const getReviews = (sort_by, order, category) => {
  return api
    .get("/reviews", { params: { category, sort_by, order } })
    .then((response) => response.data.reviews);
};

export const getSingleReview = (reviewId) => {
  return api
    .get(`/reviews/${reviewId}`)
    .then((response) => response.data.review);
};

export const getComments = (reviewId) => {
  return api
    .get(`/reviews/${reviewId}/comments`)
    .then((response) => response.data.comments);
};

export const patchReviewVotes = (reviewId, incVotes) => {
  return api
    .patch(`/reviews/${reviewId}`, incVotes)
    .then((response) => response.data.review.votes);
};

export const getCategories = () => {
  return api.get(`/categories`).then((response) => response.data.categories);
};

export const postComment = (user, reviewId, newComment) => {
  return api
    .post(`/reviews/${reviewId}/comments`, {
      username: user,
      body: newComment,
    })
    .then((response) => response.data.comment);
};
