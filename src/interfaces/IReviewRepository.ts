

export interface IReviewRepository{
    addReviewData(coordiantorsData:any,studentsData:any):any
    addScheduledReviews(id:string,scheduledReviews:any):any,
    addCoordinatorsReviews(scheduledReviews:any):any,
    coordinatorReviews(coordiantorId:String):any,
    addReviewBookingData(coordinatorId:string,reviewId:string,reviewerId:string,eventId:string,slotId:string,startTime:string,endTime:string,scheduledDate:string):any,
    getIndividualCoordinatorReview(id:string):any,
    addReviewStatusUpdation(coordinatorId:string,reviewId:string,reviewStatus:string):any
    addmeetingLink(meetingLink:string,coordinatorId:string,reviwId:string):any
    findMeetingLink(coordinatorId:string,reviwId:string):any,
    findStudentreview(studentId:string):any
}

