
export interface IReviewInteractor{
    createReviewData(studentsData:any,coordinatorsData:any):any,
    scheduler(id:string,studentData:any,coordinatorData:any):any
    getCoordinatorReviewDetail(coordiantorId:string):any,
    reviewbookingUpdation(coordinatorId:string,reviewId:string,reviewerId:string,eventId:string,slotId:string,startTime:string,endTime:string,scheduledDate:string):any
    coordinatorsReviews(coordinatorId:string):any,
    reviewStatusUpdation(coordinatorId:string,reviewId:string,reviewStatus:string):any
    meetingLinkUpdation(meetingLink:string,coordinatorId:string,reviwId:string):any
    getMeetingLink(coordinatorId:string,reviwId:string):any
    getStudentreview(studentId:string):any
}

