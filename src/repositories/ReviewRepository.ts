import { scheduledReviews } from "../entities/Reviews";
import { IReviewRepository } from "../interfaces/IReviewRepository";


export class ReviewRepository implements IReviewRepository{



    async addReviewData(coordiantorsData: any, studentsData: any) {

        const scheduledReviewData = await scheduledReviews.create({students:studentsData,coordinators:coordiantorsData})
       return scheduledReviewData
        
    }

    async addScheduledReviews(id:string,scheduleReviews:any){
        const updateScheduledReviews=await scheduledReviews.findByIdAndUpdate(id,{scheduledReviews:scheduleReviews},{new:true})
           return updateScheduledReviews
    }
    


}