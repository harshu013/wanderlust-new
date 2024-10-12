const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn,validateListing,isOwner } = require("../middleware.js");
const multer  = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer( {storage});
const listingController = require("../controllers/listings.js");

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.renderCreateListing));
// .post(upload.single("listing[image]"),(req,res)=>{
//     res.send(req.file);
// })

router.get("/new",isLoggedIn, listingController.renderNewListing)

router.get("/filter/:q", wrapAsync(listingController.filterListings));

//Search
router.get("/search", wrapAsync(listingController.search));


router.route("/:id")
.get(wrapAsync(listingController.renderShowListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync (listingController.renderUpdateListing))
.delete(isLoggedIn,validateListing, wrapAsync (listingController.renderDestroyListing));

//Edit route
router.get("/:id/edit",isLoggedIn,validateListing, wrapAsync(listingController.renderEditListing))

module.exports = router;