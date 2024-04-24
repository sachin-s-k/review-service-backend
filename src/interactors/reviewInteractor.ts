import { IReviewInteractor } from "../interfaces/IReviewInteractor";
import { IReviewRepository } from "../interfaces/IReviewRepository";
import  { ObjectId } from "mongoose"
import axios from 'axios'

export class ReviewInteractor implements IReviewInteractor{

    private ReviewRepository:IReviewRepository
    constructor(ReviewRepository:IReviewRepository){
       this.ReviewRepository=ReviewRepository
    }


    createReviewData(coordinatorsData: any,studentsData: any) {

        return this.ReviewRepository.addReviewData(coordinatorsData,studentsData)
        
    }
    sortCoordinators(coordinators:Array<{_id:ObjectId,created:Date}>){

        return coordinators.sort((coordinatorOne:any,coordinatorSecond:any)=>parseInt(coordinatorOne.created)-parseInt(coordinatorSecond.created))

      }

 scheduler(id:string,students:any, coordinators:any) {
        

interface scheduleReviews{
    reviewDate:Date,
    reviews:[{}]
}
//type ObjectIdArray = ObjectId[]
        let scheduledStudents:any=[]
        let sortedCoordinators:any=coordinators
        let remainingStudents:any=[]
        let poppedStudent:any
        let shiftedStudent:any
        let shiftedStudentArray:any
        let orgStudentCount:number=students.length
        let scheduledReviews:any=[]

        if(orgStudentCount==0 || coordinators.length===0){

               //student count is zero

               if(orgStudentCount===0){
                throw Error('Sorry,There is no students')
              }
    
              //coordinators count is zero
    
            else{
                throw Error('Sorry,There is no coordinators')
              }

          

        }

        else{

          //student count and coordinators count are equal [case--1] --------[TESTEDDDDDD]

          if(orgStudentCount===coordinators.length){
            for(let i=0;i<coordinators.length;i++){
        scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:[students[i]]})

            }
            return this.ReviewRepository.addScheduledReviews(id,scheduledReviews)
          }

           //student count is less than the coordinators count 3<20 [case-2]-------[TESTEDDDDDD]
           if((students.length!==0 && sortedCoordinators.length!==0) && (students.length<sortedCoordinators.length)){
            for(let i=0;i<orgStudentCount;i++){
                 console.log(students.length,i);
                 
                  shiftedStudent=students.shift()
                  console.log(shiftedStudent);
                  
                  if(shiftedStudent!==undefined){
                    scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:[shiftedStudent]})
                  }
            
                
            }
          
          
          return this.ReviewRepository.addScheduledReviews(id,scheduledReviews)
      }

      //student count is greater than the coordinators count student count [test cased passed]
      if((students.length!==0&&coordinators.length!==0)&&(students.length>coordinators.length)){
          console.log('review intractrooooooo');
          
        //Both are even numbers
        if(students.length%2===0&&coordinators.length%2===0){
          console.log('workedd');
          remainingStudents=students.splice(coordinators.length,students.length-coordinators.length)
          console.log(remainingStudents,'remian');

          for(let i=0;i<coordinators.length;i++){ 
              scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:[students[i]]})

          }
          //remaining students assigning

          if(remainingStudents.length){
            console.log(remainingStudents.length,);
            
            for(let i=0;i<remainingStudents.length;i++){
              console.log(scheduledReviews);
              
            if(scheduledReviews[i]){
              scheduledReviews[i].StudentList.push(remainingStudents[i])
            }
            }
          }
          return this.ReviewRepository.addScheduledReviews(id,scheduledReviews)
        }
        

        //student count is odd number,and coordinators count is even--test case passsesd

        if(students.length%2!==0 && coordinators.length%2==0){
           remainingStudents=students.splice(coordinators.length,orgStudentCount)

          for(let i=0;i<coordinators.length;i++){

             scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:[students[i]]})

            }
                
              

              if(remainingStudents.length){
                for(let i=0;i<remainingStudents.length;i++){
                scheduledReviews[i].StudentList.push(remainingStudents[i])
                }
              }
              return this.ReviewRepository.addScheduledReviews(id,scheduledReviews)
            
              }

              

             // student count is even  number and, coordinator count is odd number//test case passes

              if(students.length%2==0&&coordinators.length%2!==0){

                remainingStudents=students.splice(coordinators.length,orgStudentCount)
  
              
          for(let i=0;i<coordinators.length;i++){

            scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:[students[i]]})

           }
               

                if(remainingStudents.length){
                  for(let i=0;i<remainingStudents.length;i++){
                    scheduledReviews[i].StudentList.push(remainingStudents[i])
                  }
                }
  
  
  
  
                return this.ReviewRepository.addScheduledReviews(id,scheduledReviews)
              }

              // Both student and coordinators count is odd number

              if(students.length%2!==0&&coordinators.length%2!==0){

                remainingStudents=students.splice(coordinators.length,orgStudentCount)

                for(let i=0;i<coordinators.length;i++){
                
               scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:[students[i]]})
                }

                if(remainingStudents.length){
                  for(let i=0;i<remainingStudents.length;i++){
                   scheduledReviews[i].StudentList.push(remainingStudents[i])
                  }
                }
                return this.ReviewRepository.addScheduledReviews(id,scheduledReviews)
              }

              
              
            
            }

        }

      }

     async getReviewStudentDetail(studentId:string){

        try{
          // console.log('entered student', studentId);
          
          const student= await axios.get(`http://localhost:4001/student-service/students/${studentId}`)
          // console.log('|||||||||||||||||||||');
          
          // console.log(student.data);
          // console.log('|||||||||||||||||||||');
          return student.data

        }catch(error){

        }

      }

      async  getCoordinatorReviewDetail(coordinatorID:string){
        
      try{
        // console.log('entereddd');
        
        const coordinatorReviewDetails=  await this.ReviewRepository.coordinatorReviews(coordinatorID)
        // console.log(coordinatorReviewDetails);
        const {reviews}=coordinatorReviewDetails[0]
        // console.log(reviews);
        
        const studentDetails=await Promise.all(reviews.map(async (student:any)=>{
// console.log(student,'studennnttttttttttttt');

       const studentData:any=await this.getReviewStudentDetail(student._doc.studentId)
//console.log(studentData);

       return {...student._doc,name:studentData.name,batch:studentData.batch,currentWeek:studentData.currentWeek,domain:studentData.domain}

        }))
         console.log('student detaislsssssssssssss');
         
      console.log(studentDetails);
        return studentDetails
      }catch(error){
        console.log(error);
        
        return {error,message:"there is an error in fetching the reviews"}
      }


       }



       async reviewbookingUpdation(data:any){

       }

       async reviewStatusUpdation(coordinatorId:string,reviewId:string,reviewerId:string,eventId:string,slotId:string){

       }

}