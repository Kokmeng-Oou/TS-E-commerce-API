import mongoose, { Document } from 'mongoose'

import validator from 'validator'
import bcrypt from 'bcryptjs'

import { IUser } from '../interfaces'

interface IUserDocument extends IUser, Document {
  createdAt: Date
  updatedAt: Date
  comparePassword(password: string): Promise<boolean>
}

const userSchema: mongoose.Schema<IUserDocument> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email is already in use'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email is already in use'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
}) // <-- add this

userSchema.pre('save', async function (this: IUserDocument) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function comparePassword(
  candidatePassword: string
): Promise<boolean> {
  const user = this as IUserDocument
  const isMatch = await bcrypt.compare(candidatePassword, user.password)
  return isMatch
}

export default mongoose.model<IUserDocument>('User', userSchema)
