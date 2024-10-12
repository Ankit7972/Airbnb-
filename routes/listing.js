const express = require("express");
const router = express.Router(); // Instead of defining all routes in one main file (e.g., app.js), you can define routes in separate modules and then mount them on the main app.
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const passport = require("passport");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

router
  .route("/")
  .get(wrapAsync(listingController.index)) //Index Route
  .post(
    isLoggedIn,
    validateListing,
    wrapAsync(listingController.createListing)
  ); //Create Route

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) //Show Route
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
  ) //Update Route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); //Delete Route

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
