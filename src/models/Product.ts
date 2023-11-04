import mongoose, { Document } from 'mongoose'
import { IProducts } from '../interfaces'

const productSchema: mongoose.Schema<IProducts> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true,
      maxlength: [100, 'Name can not be more than 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      default: 0,
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
      maxLength: [1000, 'Description can not be more than 1000 characters'],
    },
    image: {
      type: String,
      required: [true, 'Please provide product image url'],
      default: '/uploads/example.jpg',
    },
    category: {
      type: String,
      required: [true, 'Please provide category for the product'],
      enum: ['office', 'kitchen', 'bedroom'],
    },
    company: {
      type: String,
      required: [true, 'Please provide company of the product'],
      enum: {
        values: ['ikea', 'liddy', 'marcos'],
        message: '{VALUE} is not support',
      },
    },
    colors: {
      type: [String],
      default: ['#222'],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: [true, 'Please provide quantity in stock'],
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Product must belong to a admin'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

productSchema.virtual('review', {
  ref: 'review', // The model to use
  localField: '_id',
  foreignField: 'product',
  justOne: false,
})

productSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    await mongoose.model('review').deleteMany({ product: this._id })
    next()
  }
)

export default mongoose.model<IProducts>('Product', productSchema)
