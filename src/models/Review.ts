import mongoose, { ObjectId } from 'mongoose'

interface IReview {
  title: string
  rating: number
  comment: string
  user: ObjectId
  product: ObjectId
}

const reviewSchema = new mongoose.Schema<IReview>(
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
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

reviewSchema.index({ product: 1, user: 1 }, { unique: true })

export default mongoose.model<IReview>('review', reviewSchema)
