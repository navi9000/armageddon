export interface Asteroid {
  id: string
  name: string
  estimated_diameter: {
    meters: {
      estimated_diameter_min: number
      estimated_diameter_max: number
    }
  }
  is_potentially_hazardous_asteroid: boolean
  close_approach_data: {
    close_approach_date: string
    relative_velocity: {
      kilometers_per_second: number
    }
    miss_distance: {
      lunar: number
      kilometers: number
    }
    orbiting_body: string
  }[]
}

export interface AsteroidListData {
  links: {
    next: string
  }
  near_earth_objects: {
    [date in string]: Asteroid[]
  }
}
