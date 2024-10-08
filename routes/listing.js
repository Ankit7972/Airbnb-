const express = require("express");
const router = express.Router(); // Instead of defining all routes in one main file (e.g., app.js), you can define routes in separate modules and then mount them on the main app.
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js"); // server validation by JOI
const Listing = require("../models/listing.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body); //checking validation from joi
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

//Index Route
router.get(
  "/",
  wrapAsync(async (req, res, next) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

//New Route
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Show Route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
      req.flash("error", "Listing not exists");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  })
);

//Create Route
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  })
);

//Edit Route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not exists");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  })
);

//Update Route
router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  })
);

//Delete Route
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  })
);

module.exports = router;
