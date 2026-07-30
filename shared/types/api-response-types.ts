export interface LoginResponse {
   token: string
}

export interface UserResponse {
   id: number
   name: string
   email: string
}

export interface UserDeleteResponse {
   result: boolean
}