const express = require("express");
const router = express.Router({ mergeParams: true }); // Instead of defining all routes in one main file (e.g., app.js), you can define routes in separate modules and then mount them on the main app  (mergeparams is allow the child to use parents params).
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js"); // server validation by JOI
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body); //checking validation from joi
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

//Review
//Post Route
router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview); // Adding review to listing
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`); // Redirecting instead of rendering
  })
);

//Review
//Delete route
router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
