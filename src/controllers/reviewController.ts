import { IReviewInteractor } from "../interfaces/IReviewInteractor";


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

}

export {ReviewController}
