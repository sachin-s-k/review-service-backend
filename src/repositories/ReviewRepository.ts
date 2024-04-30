import mongoose from "mongoose";
import { scheduledReviews } from "../entities/ReviewScheduler";
import { reviews } from "../entities/ReviewSchema";
import { IReviewRepository } from "../interfaces/IReviewRepository";



export class ReviewRepository implements IReviewRepository{



    async addReviewData(coordiantorsData: any, studentsData: any) {

        const scheduledReviewData = await scheduledReviews.create({students:studentsData,coordinators:coordiantorsData})
       return scheduledReviewData
        
    }

    async addScheduledReviews(id:string,scheduleReviews:any){
        const updateScheduledReviews=await scheduledReviews.findByIdAndUpdate(id,{scheduledReviews:scheduleReviews},{new:true})
       const res=await  this.addCoordinatorsReviews(scheduleReviews)
       console.log(res,'ress');
       
           return updateScheduledReviews
           
    }
    async addCoordinatorsReviews(scheduledReviews: any) {
        let coordinatorReviews:any
        for(let i=0;i<scheduledReviews.length;i++){
           coordinatorReviews=await reviews.find({coordinatorId:scheduledReviews[i].coordinatorsId})
             console.log(coordinatorReviews);
             
            if(coordinatorReviews.length){

                for(let j=0;i<scheduledReviews.studentList.length;j++){
                    await coordinatorReviews.reviews.push({studentId:scheduledReviews[i].StudentList[j]._id})

                }
                
                
                
            }else{
                coordinatorReviews=await reviews.create({coordinatorId:scheduledReviews[i].coordinatorsId})
                for(let j=0;j<scheduledReviews[i].StudentList.length;j++){
                    await coordinatorReviews.reviews.push({studentId:scheduledReviews[i].StudentList[j]._id})

                }
               
            }
           const res= await coordinatorReviews.save()

           console.log(res,'coordinator distrbutommmm');
           
        }


       



   
        
    }
    async coordinatorReviews(coordinatorId:string){
       try{
        const coordinatorReviews=await reviews.find({coordinatorId:coordinatorId})

        if(coordinatorReviews){
            return coordinatorReviews
        }
        else{
            return {message:"There is no coordnator"}
        }
       }
    
    catch(error:any){
        return {error:error,message:"There is an error "}
    }
}

async addReviewBookingData(coordinatorId:string,reviewId:string,reviewerId:string,eventId:string,slotId:string,startTime:string,endTime:string,scheduledDate:string) {
    //coodinatorData:
    //reviewObjectId

    const updatefields={$set:{'reviews.$[review].startTime':startTime,'reviews.$[review].endTime':endTime,'reviews.$[review].scheduledDate':scheduledDate,'reviews.$[review].reviewerId':reviewerId,'reviews.$[review].slotId':slotId,'reviews.$[review].eventId':eventId}}
    const filter=[{'review._id':reviewId}]
    
const response=await reviews.findOneAndUpdate({coordinatorId:coordinatorId},updatefields,{new:true,arrayFilters:filter})
console.log(response,'ressssss');

return response

}
   


async getIndividualCoordinatorReview(coordinatorId:string){

    const assignedReviews=await reviews.find({coordinatorId,reviews:{$elemMatch:{reviewStatus:"notcompleted"}}},{
        'reviews.$': 1
      })
    console.log(assignedReviews,'asss');
    

    return assignedReviews

}
async addReviewStatusUpdation(reviewId:string,coordinatorId:string,reviewStatus:string) {
    console.log('reppooo');



    const updatefields={$set:{'reviews.$[review].reviewStatus':reviewStatus}}
    const filter=[{'review._id':reviewId}]
    
   const response=await reviews.findOneAndUpdate({coordinatorId:coordinatorId},updatefields,{new:true,arrayFilters:filter})
   console.log(response,'ressssss');

return response
    
}
async addmeetingLink(meetingLink: string, coordinatorId: string, reviewId: string) {
    
    const updatefields={$set:{'reviews.$[review].meetingLink':meetingLink}}
    const filter=[{'review._id':reviewId}]
    
   const response=await reviews.findOneAndUpdate({coordinatorId:coordinatorId},updatefields,{new:true,arrayFilters:filter})
 return response
}



 async findMeetingLink(coordinatorId: string, reviewId: string) {

    const filter=[{'review._id':reviewId}]
    
   const response=await reviews.findOne({coordinatorId:coordinatorId})
   const reviewData:any=response?.reviews.filter((data:any)=>{
    return data?._id==reviewId
   })

return reviewData[0].meetingLink
    
}



async findStudentreview(studentId: string) {
    const response=await reviews.aggregate([
        {
          '$project': {
            'coordinatorId': 1, 
            'reviews': 1
          }
        }, {
          '$unwind': {
            'path': '$reviews'
          }
        }, {
          '$match': {
            '$and': [
              {
                'reviews.studentId': new mongoose.Types.ObjectId('657aaa012a15acfff364bb5a')
              }, {
                '$or': [
                  {
                    'reviews.reviewStatus': 'scheduled'
                  }, {
                    'reviews.reviewStatus': 'repeat'
                  }
                ]
              }
            ]
          }
        }
      ])
      if(response.length){
        return response[0]
      }else{
        return {error:true,message:"there is no scheduled reviews"}
      }

      
}

    


}