export interface IUser {
  username: any
  email: any
  password: any
  role: 'admin' | 'user'
}

export interface IReview {
  title: string
  rating: number
  comment: string
  user: IUser
  product: IProducts
}

export interface IProducts {
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
  user: IUser
}
