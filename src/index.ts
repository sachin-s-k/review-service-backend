import express, { Application, Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import { config,connectDB } from "./config/dbConfig";
import nodecron, { schedule } from 'node-cron'
import { ReviewController } from "./controllers/reviewController";
import { consumerConnect } from "./infrastructure/consumers/consumer";
import { ReviewRepository } from "./repositories/ReviewRepository";
import { ReviewInteractor } from "./interactors/reviewInteractor";
// import { sendMessage } from "./infrastructure/kafkaService";
import { reviewRouter } from "./routes/reviewRouter";
import bodyParser from "body-parser"
dotenv.config();
const app: Application = express();
const port = process.env.PORT || 6001
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true // Make sure to enable credentials
}
app.use(cors(corsOptions))
app.use(bodyParser.json())

const reviewRepository= new ReviewRepository()
const reviewInteractor=new ReviewInteractor(reviewRepository)
const reviewController=new ReviewController(reviewInteractor)
app.use('/review',reviewRouter)




nodecron.schedule('* * * * *', async () => {

  
  try {
 
    
    const message={
      type:'review-scheduler-data',
      data:{id:'123'}
     
  }
    // sendMessage('review-events',message)
  } catch (error) {
    console.error('Error scheduling review:', error);
  }
})

var coordinatorsData:any
var studentsData:any
var savedReviewData:any

function checkAndSchduleEVents() {

  if(coordinatorsData !== undefined && studentsData!== undefined){

    
    scheduleInteractor()
  }

}

async function scheduleInteractor(){
console.log('helllo',studentsData,coordinatorsData);

  if((studentsData!== undefined && coordinatorsData!== undefined) && (studentsData.length && coordinatorsData.length)){
    console.log('scheduler interactor calleddd',studentsData,coordinatorsData);
    
   savedReviewData= await reviewController.OncreateReviewData(coordinatorsData,studentsData)
    // studentsData=undefined
    // coordinatorsData=undefined



  // if(savedReviewData){
  //  let {students,coordinators} = savedReviewData
  
  // let id:string=savedReviewData._id
  // savedReviewData=undefined

  //  const scheduledData= await reviewController.OnScheduleReview(id,students,coordinators)
   

  //  if(scheduledData.scheduledReviews.length){
   

        
  //       console.log(studentsData,coordinatorsData);
  //       const message={
  //         type:'advisors-task',
  //         reviewData:scheduledData.scheduledReviews
  //       }
    
  //       sendMessage('review-events',message)
    
  //      }else{
  //       const message={
  //         type:'advisors-task',
  //         reviewData:[]
  //       }
    
  //       sendMessage('review-events',message)

  //      }
  // }
   }
  
}


async function consumeCoordinatorEvents(message:any) {
  try {
    coordinatorsData = JSON.parse(message.value.toString());
  
return  coordinatorsData
    
  } catch (error) {
    console.error('Error processing Coordinator event:', error);
  }
}
async function consumeStudentEvents(message:any) {
  try {
   studentsData = JSON.parse(message.value.toString());
    
    checkAndSchduleEVents()
  } catch (error) {
    console.error('Error processing product event:', error);
  }
}
app.listen(port,()=>{
  console.log(`app coneected successfullly:${port}`);
  

})
connectDB(config)
//consumerConnect()

export {consumeCoordinatorEvents,consumeStudentEvents}