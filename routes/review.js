const express = require("express");
const router = express.Router({ mergeParams: true }); // Instead of defining all routes in one main file (e.g., app.js), you can define routes in separate modules and then mount them on the main app  (mergeparams is allow the child to use parents params).
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//Review
//Post Route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

//Review
//Delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
