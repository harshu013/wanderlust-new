const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//REVIEWS route
router.post("/", isLoggedIn,validateReview,wrapAsync(reviewController.renderAddReview));

//review delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.renderDestroyReview));

module.exports = router;