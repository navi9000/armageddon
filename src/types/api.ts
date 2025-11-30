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
