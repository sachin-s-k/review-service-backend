
import  { ObjectId } from "mongoose"
import { IReviewScheduler } from "../interfaces/IReviewScheduler"


interface scheduleReviews{
    reviewDate:Date,
    reviews:[{}]
}
type ObjectIdArray = ObjectId[]

class   ReviewScheduler implements IReviewScheduler {

    private studentCount:Number=10
    private coordinatorCount:Number=10
    private students:Array<ObjectId>
    private coordinators:Array<{_id:ObjectId}>
  

    private scheduledReviews:Array<{coordinatorsId:ObjectId,StudentList:ObjectIdArray}>=[]
    
      constructor(coordinators:any,students:any){
        this.coordinators=coordinators
        this.students=students
      }




    // private   students = [

    //     { _id:  1, studentName: 'Student1', currentWeek: 5 },
    //     { _id:2 , studentName: 'Student2', currentWeek: 5 },
    //     { _id: 3, studentName: 'Student3', currentWeek: 5 },
    //     { _id: 4, studentName: 'Student4', currentWeek: 5 },
    //     { _id: 5, studentName: 'Student5', currentWeek: 5 },
    //     { _id: 6, studentName: 'Student6', currentWeek: 5 },
    //     { _id: 7, studentName: 'Student7', currentWeek: 5 },
    //     { _id: 8, studentName: 'Student8', currentWeek: 5 },
    //     { _id: 9, studentName: 'Student9', currentWeek: 5 },
    //     { _id:10 , studentName: 'Student10', currentWeek: 5 },
    //   ]
  
      // private   coordinators = [
      //   { _id: 11, reviewerName: 'reviewer1', created: '2021-11-17T03:19:56.186Z' },
      //   { _id: 12, reviewerName: 'reviewer2', created: '2021-11-18T03:19:57.186Z' },
      //   { _id: 13, reviewerName: 'reviewer3', created: '2021-11-19T03:19:58.186Z' },
      //   { _id: 14, reviewerName: 'reviewer4', created: '2021-11-20T03:19:59.186Z' },
      //   { _id: 15, reviewerName: 'reviewer5', created: '2021-11-21T03:20:00.186Z' },
      //   { _id: 16, reviewerName: 'reviewer6', created: '2021-11-22T03:20:01.186Z' },
      //   { _id: 17, reviewerName: 'reviewer7', created: '2021-11-23T03:20:02.186Z' },
      //   { _id: 18, reviewerName: 'reviewer8', created: '2021-11-24T03:20:03.186Z' },
      //   { _id: 19, reviewerName: 'reviewer9', created: '2021-11-25T03:20:04.186Z' },
      //   { _id: 20, reviewerName: 'reviewer10',created: '2021-11-26T03:20:05.186Z' }
      // ]



      private sortCoordinators(coordinators:Array<{_id:ObjectId,created:Date}>){

        return coordinators.sort((coordinatorOne:any,coordinatorSecond:any)=>parseInt(coordinatorOne.created)-parseInt(coordinatorSecond.created))

      }

      


      scheduler(students:Array<ObjectId>, coordinators: []) {
        let scheduledStudents:Array<ObjectId>=[]
        let sortedCoordinators:Array<{_id:ObjectId,created:Date}>=this.sortCoordinators(coordinators)
        let remainingStudents:Array<ObjectId>=[]
        let poppedStudent:ObjectId|undefined
        let shiftedStudent:ObjectId|undefined
        let shiftedStudentArray:ObjectIdArray
        let orgStudentCount:number=students.length


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
             this.scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:[students[i]]})

            }
            return this.scheduledReviews
          }

           //student count is less than the coordinators count 3<20
           if((students.length!==0 && sortedCoordinators.length!==0) && (students.length<sortedCoordinators.length)){

              

            for(let i=0;i<students.length;i++){
                for(let j=0;j<1;j++){
                  shiftedStudent=students.shift()
                  if(shiftedStudent!==undefined)
              this.scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:[shiftedStudent]})
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
            this.scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:shiftedStudentArray})
            }
            return this.scheduledReviews
          }

        }else{

          for(let i=0;i<coordinators.length;i++){
            remainingStudents=students.splice(students.length-(students.length%coordinators.length),students.length)
            for(let j=0;j<1;j++){
              shiftedStudentArray=students.splice(0,Math.floor(students.length/coordinators.length))
              this.scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:shiftedStudentArray})

            }


          }
          //remaining students assigning

          if(remainingStudents.length){
            for(let i=0;i<remainingStudents.length;i++){
              this.scheduledReviews[i].StudentList.push(remainingStudents[i])
            }
          }
          return this.scheduledReviews
        }
        

        //student count is odd number,and coordinators count is even

        if(students.length%2!==0 && coordinators.length%2==0){
           remainingStudents=students.splice(students.length-(students.length%coordinators.length),students.length%coordinators.length)

          for(let i=0;i<coordinators.length;i++){

            remainingStudents=students.splice(students.length-Math.floor(students.length%coordinators.length),students.length)

           

            shiftedStudentArray=students.splice(0,Math.floor(orgStudentCount/coordinators.length))
            if(shiftedStudentArray.length!==0){
              this.scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:shiftedStudentArray})

            }
                
              }

              if(remainingStudents.length){
                for(let i=0;i<remainingStudents.length;i++){
                  this.scheduledReviews[i].StudentList.push(remainingStudents[i])
                }
              }
              return this.scheduledReviews
            
              }

              

             // student count is even  number and, coordinator count is odd number

              if(students.length%2==0&&coordinators.length%2!==0){

                remainingStudents=students.splice(coordinators.length,orgStudentCount)
  
                for(let i=0;i<coordinators.length;i++){
                  shiftedStudentArray=students.splice(0,Math.floor(orgStudentCount/coordinators.length))

                  this.scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:shiftedStudentArray})
                }

                if(remainingStudents.length){
                  for(let i=0;i<remainingStudents.length;i++){
                    this.scheduledReviews[i].StudentList.push(remainingStudents[i])
                  }
                }
  
  
  
  
                return this.scheduledReviews
              }
              // Both student and coordinators count is odd number

              if(students.length%2!==0&&coordinators.length%2!==0){

                remainingStudents=students.splice(coordinators.length,orgStudentCount)

                for(let i=0;i<coordinators.length;i++){
                shiftedStudentArray=students.splice(0,Math.floor(orgStudentCount/coordinators.length))
                this.scheduledReviews.push({coordinatorsId:sortedCoordinators[i]._id,StudentList:shiftedStudentArray})
                }
              }

              if(remainingStudents.length){
                for(let i=0;i<remainingStudents.length;i++){
                  this.scheduledReviews[i].StudentList.push(remainingStudents[i])
                }
              }
              return this.scheduledReviews
              
            
            }

        }

      }
  
}


export default ReviewScheduler


