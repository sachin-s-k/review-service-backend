import mongoose, { Schema,model } from "mongoose";
import { IReviewSchema } from "../interfaces/IReviewSchema";
import { IReview } from "../interfaces/IReviewSchema";



const reviewSchema=new Schema<IReviewSchema>(
    {
        coordinatorId:mongoose.Schema.Types.ObjectId,
        reviews:[{
            _id:{
                type:mongoose.Schema.Types.ObjectId,
                auto:true
            },
            studentId:mongoose.Schema.Types.ObjectId,
            reviewerId:mongoose.Schema.Types.ObjectId,
            reviewStatus:{
                type:String,
                default:"notcompleted"
            },
            assignedDate:{
            type:Date,
            default:null
           },
            conductedDate:{
                type:Date,
                default:null
            },
            reviewDate:{
                type:Date,
                default:function (this:IReview){
                    const assigned=new Date(this.assignedDate)
                    return assigned? new Date(assigned.setDate(assigned.getDate()+2)):null
                }
            }
            
            
        },
        ]

    },
    {
        timestamps:true
    }
)

const reviews=model<IReviewSchema>('review',reviewSchema)
export {reviews}