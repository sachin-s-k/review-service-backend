
export interface IReviewInteractor{
    createReviewData(studentsData:any,coordinatorsData:any):any,
    scheduler(id:string,studentData:any,coordinatorData:any):any
    getCoordinatorReviewDetail(coordiantorId:string):any,
    reviewbookingUpdation(coordinatorId:string,reviewId:string,reviewerId:string,eventId:string,slotId:string):any
    
}

