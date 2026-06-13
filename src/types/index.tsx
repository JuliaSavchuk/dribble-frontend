//Auth / User

export interface User {
  id: number
  email: string
  username: string
  avatar: string | null
  bio?: string
  website?: string
  twitter?: string
  instagram?: string
  linkedin?: string
  shots_count?: number
  followers_count?: number
  following_count?: number
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access: string
  refresh: string
}

export interface RegisterRequest {
  email: string
  username: string
  password: string
  password2: string
}

export interface RegisterResponse {
  id: number
  email: string
  username: string
}

export interface TokenRefreshRequest {
  refresh: string
}

export interface TokenRefreshResponse {
  access: string
}

export interface GoogleLoginRequest {
  token: string
}

export interface GoogleLoginResponse {
  access: string
  refresh: string
  created: boolean
}

//Shots

export interface ShotAuthor {
  id: number
  username: string
  avatar: string | null
}

export interface Shot {
  id: number
  title: string
  description: string
  image: string
  preview: string
  tags: string[]
  author: ShotAuthor
  likes_count: number
  comments_count: number
  is_liked: boolean
  is_saved: boolean
  created_at: string
}

//Comments

export interface Comment {
  id: number
  text: string
  author: ShotAuthor
  created_at: string
}

//Pagination

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

//API Errors
export interface ApiError {
  detail?: string
  [field: string]: string | string[] | undefined
}
