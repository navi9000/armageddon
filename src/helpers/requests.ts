import { ROOT_URL } from "@/config/constants"
import { ApiResponse, Asteroid_v2 } from "@/types/api"

export async function fetchAsteroidById(id: string) {
  return fetch(ROOT_URL.concat("/api/asteroids/", id))
    .then((res) => res.json())
    .then((data: ApiResponse<Asteroid_v2>) => {
      if (!data.is_success) {
        throw data.errorMessage
      }
      return data.data
    })
}

export async function fetchAsteroidList(datestring: string) {
  return fetch(ROOT_URL.concat("/api/asteroids/by-date/", datestring))
    .then((res) => res.json())
    .then(
      (data: ApiResponse<{ asteroidList: Asteroid_v2[]; next: string }>) => {
        if (!data.is_success) {
          throw data.errorMessage
        }
        return data.data
      }
    )
}
