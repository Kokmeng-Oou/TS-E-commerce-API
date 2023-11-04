export type UserType = {
  username: string
  email: string
  password: string
  role: 'admin' | 'user'
}

export type TokenUserType = {
  username: string
  userId: string
  role: 'admin' | 'user'
}
