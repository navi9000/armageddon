export interface Approach {
  date: string
  miss_distance: {
    km: string
    lunar: string
  }
  orbiting_body: string
  velocity: string
}

export interface Asteroid_v2 {
  asteroid: {
    id: string
    name: string
    diameter: number
    is_hazardous: boolean
    nearest_approach_index: number
  }
  approaches: Approach[]
}

export interface SuccessfulApiResponse<T> {
  is_success: true
  data: T
}

export interface UnsuccessfulApiResponse {
  is_success: false
  errorMessage: string
}

export type ApiResponse<T> = SuccessfulApiResponse<T> | UnsuccessfulApiResponse
