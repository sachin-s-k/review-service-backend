import express from "express";
import { ReviewRepository } from "../repositories/ReviewRepository";
import { ReviewInteractor } from "../interactors/reviewInteractor";
import { ReviewController } from "../controllers/reviewController";
const reviewRouter=express.Router()
const reviewRepository=new ReviewRepository()
const reviewInteractor=new ReviewInteractor(reviewRepository)
const reviewController=new ReviewController(reviewInteractor)





reviewRouter.get('/assigned-reviews/:coordinatorId',reviewController.onGetCoordinatorsReview.bind(reviewController))
reviewRouter.get('/coordinator-reviews/:coordinatorId',reviewController.OnGetScheduledReviews.bind(reviewController))
reviewRouter.post('/update',reviewController.onUpdateReviewBooking.bind(reviewController))
reviewRouter.get('/meeting-link/:coordinatorId/:reviewId',reviewController.OngetMeetingLink.bind(reviewController))
reviewRouter.get('/student-review/:studentId',reviewController.OnGetStudentReview.bind(reviewController))
export {reviewRouter,reviewController}