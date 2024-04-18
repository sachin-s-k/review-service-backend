import { model,Schema } from "mongoose"
import IReview from "../interfaces/IReview"


const reviewSchema=new Schema<IReview>(
    
   {

    scheduledReviews:Array,
    students:Array,
    coordinators:Array
   }, 
   {
    timestamps:true
   }



)

const scheduledReviews=model<IReview>('scheduled-review',reviewSchema)

export {scheduledReviews}