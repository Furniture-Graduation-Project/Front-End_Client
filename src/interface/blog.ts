export interface IBlog {
  _id: string
  employeeId: {
    _id: string
    fullName: string
  }
  title: string
  content: string
  tags: string[]
  image: string
  createdAt: string
  updatedAt: string
}

export interface BlogResponse {
  data: IBlog[]
  totalPage: number
  totalData: number
  message: string
}
