import { model,Schema } from "mongoose"
import IReview from "../interfaces/IReview"


const reviewSchema=new Schema<IReview>(
    
   {

    scheduledDate:Date.now,
    scheduledReviews:Array,
   
   }, 
   {
    timestamps:true
   }



)

const scheduledReviews=model<IReview>('scheduled-review',reviewSchema)

export {scheduledReviews}