import mongoose, { ObjectId } from 'mongoose'

interface products {
  name: string
  price: number
  description: string
  image: string
  category: string
  company: string
  colors: string[]
  featured: boolean
  freeShipping: boolean
  inventory: Number
  averageRating: number
  user: ObjectId
}

const productSchema = new mongoose.Schema<products>(
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
      default: '/uploads/example.jpeg',
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
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: [true, 'Product must belong to a admin'],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<products>('Products', productSchema)
