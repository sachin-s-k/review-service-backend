import { IReviewInteractor } from "../interfaces/IReviewInteractor";
import { Request,Response } from "express";

class ReviewController {
    private reviewInteractor:IReviewInteractor
    constructor(reviewInteractor:IReviewInteractor  ){
        this.reviewInteractor=reviewInteractor
    }

    async OnScheduleReview(id:string,studentsData:any,coordinatorsData:any){
     

            try{
            console.log('review controller calleed=======');
            
              
                const response= await  this.reviewInteractor.scheduler(id,studentsData,coordinatorsData)
                return response
            
            }
            catch(error){
                console.error(error);
            // res.status(500).json({ message: 'Error creating product' });
          
          
            }
        
         
    
        
   
        
    }

   async  OncreateReviewData(coordinatorsData:any,studentsData:any){

        const response=  await this.reviewInteractor.createReviewData(coordinatorsData,studentsData)
        
        return response   
   }
   async onGetCoordinatorsReview(req:Request,res:Response){

    const coordinatorId=req.params.coordinatorId
    console.log(coordinatorId);
    
    const response=await this.reviewInteractor.getCoordinatorReviewDetail(coordinatorId)

    return res.json(response)


   }
   async onUpdateReviewBooking(data:any){
console.log('helloo');

    
    const { coordinatorId,reviewId,reviewerId,eventId,slotId,startTime,endTime,scheduledDate}=data
    // const scheduledDate=req.body.conductedDate
    // const reviewId="6628ef19622dcbd305e0d713"
    // const coordinatorId="65ed8fc3afcda5149bbf0166"
    const  response=await this.reviewInteractor.reviewbookingUpdation(coordinatorId,reviewId,reviewerId,eventId,slotId,startTime,endTime,scheduledDate)
    console.log(response);
    

   }


   async onGetAllCoordinatorsReviews(req:Request,res:Response){

    const coordinatorId=req.params.coordinatorId

    const response=await this.reviewInteractor.coordinatorsReviews(coordinatorId)

       return res.json(response)

   }

 async OnGetScheduledReviews(req:Request,res:Response){


    const coordinatorId=req.params.coordinatorId
    const response=await this.reviewInteractor.coordinatorsReviews(coordinatorId)

       return res.json(response)

   }

   async OnReviewStatusUpdation(data:any){
    const {coordinatorId,reviewId,reviewStatus}=data
    const response=await this.reviewInteractor.reviewStatusUpdation(coordinatorId,reviewId,reviewStatus)
    
   }




}

export {ReviewController}
