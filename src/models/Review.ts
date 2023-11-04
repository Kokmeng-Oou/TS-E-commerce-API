import mongoose, { ObjectId } from 'mongoose'
// import { IUser } from './User' // Define an interface that extends Document and includes the properties and methods of the user schema
// import { IProducts } from './Product'
import { IReview } from '../interfaces'

interface IReviewDocument extends IReview, Document {
  createdAt: Date
  updatedAt: Date
}

const reviewSchema = new mongoose.Schema<IReviewDocument>(
  {
    title: { type: String, required: [true, 'Title is required'] },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Minimum rating should be 1'],
      max: [5, "Maximum rating can't exceed 5"],
    },
    comment: { type: String, required: [true, 'Comment is required'] },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

reviewSchema.index({ product: 1, user: 1 }, { unique: true })

export default mongoose.model<IReviewDocument>('review', reviewSchema)
