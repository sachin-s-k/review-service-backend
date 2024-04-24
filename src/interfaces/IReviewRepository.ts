

export interface IReviewRepository{
    addReviewData(coordiantorsData:any,studentsData:any):any
    addScheduledReviews(id:string,scheduledReviews:any):any,
    addCoordinatorsReviews(scheduledReviews:any):any,
    coordinatorReviews(coordiantorId:String):any,
    addReviewBookingData(data:any):any
}

