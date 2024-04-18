import { IReviewInteractor } from "../interfaces/IReviewInteractor";
import { IReviewRepository } from "../interfaces/IReviewRepository";
import  { ObjectId } from "mongoose"
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

          //student count and coordinators count are equal

          if(orgStudentCount===coordinators.length){
            for(let i=0;i<coordinators.length;i++){
        scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:[students[i]]})

            }
            return this.ReviewRepository.addScheduledReviews(id,scheduledReviews)
          }

           //student count is less than the coordinators count 3<20
           if((students.length!==0 && sortedCoordinators.length!==0) && (students.length<sortedCoordinators.length)){

              

            for(let i=0;i<students.length;i++){
                for(let j=0;j<1;j++){
                  shiftedStudent=students.shift()
                  if(shiftedStudent!==undefined)
             scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:[shiftedStudent]})
                }
            }
      }

      //student count is greater than the coordinators count
      if((students.length!==0&&coordinators.length!==0)&&(students.length>coordinators.length)){

        //Both are even numbers
        if(students.length%coordinators.length===0){
          if(students.length%2===0 && coordinators.length%2===0){

            for(let i=0;i<coordinators.length;i++){
            shiftedStudentArray=students.splice(0,orgStudentCount/coordinators.length)
            scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:shiftedStudentArray})
            }
            return scheduledReviews
          }

        }else{

          for(let i=0;i<coordinators.length;i++){
            remainingStudents=students.splice(students.length-(students.length%coordinators.length),students.length)
            for(let j=0;j<1;j++){
              shiftedStudentArray=students.splice(0,Math.floor(students.length/coordinators.length))
              scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:shiftedStudentArray})

            }


          }
          //remaining students assigning

          if(remainingStudents.length){
            for(let i=0;i<remainingStudents.length;i++){
             scheduledReviews[i].StudentList.push(remainingStudents[i])
            }
          }
          return scheduledReviews
        }
        

        //student count is odd number,and coordinators count is even

        if(students.length%2!==0 && coordinators.length%2==0){
           remainingStudents=students.splice(students.length-(students.length%coordinators.length),students.length%coordinators.length)

          for(let i=0;i<coordinators.length;i++){

            remainingStudents=students.splice(students.length-Math.floor(students.length%coordinators.length),students.length)

           

            shiftedStudentArray=students.splice(0,Math.floor(orgStudentCount/coordinators.length))
            if(shiftedStudentArray.length!==0){
             scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:shiftedStudentArray})

            }
                
              }

              if(remainingStudents.length){
                for(let i=0;i<remainingStudents.length;i++){
                scheduledReviews[i].StudentList.push(remainingStudents[i])
                }
              }
              return scheduledReviews
            
              }

              

             // student count is even  number and, coordinator count is odd number

              if(students.length%2==0&&coordinators.length%2!==0){

                remainingStudents=students.splice(coordinators.length,orgStudentCount)
  
                for(let i=0;i<coordinators.length;i++){
                  shiftedStudentArray=students.splice(0,Math.floor(orgStudentCount/coordinators.length))

                  scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:shiftedStudentArray})
                }

                if(remainingStudents.length){
                  for(let i=0;i<remainingStudents.length;i++){
                    scheduledReviews[i].StudentList.push(remainingStudents[i])
                  }
                }
  
  
  
  
                return scheduledReviews
              }
              // Both student and coordinators count is odd number

              if(students.length%2!==0&&coordinators.length%2!==0){

                remainingStudents=students.splice(coordinators.length,orgStudentCount)

                for(let i=0;i<coordinators.length;i++){
                shiftedStudentArray=students.splice(0,Math.floor(orgStudentCount/coordinators.length))
               scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:shiftedStudentArray})
                }
              }

              if(remainingStudents.length){
                for(let i=0;i<remainingStudents.length;i++){
                 scheduledReviews[i].StudentList.push(remainingStudents[i])
                }
              }
              return scheduledReviews
              
            
            }

        }

      }
}