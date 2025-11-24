export default class Queue {
  #fnList: Function[] = []

  subscribe(fn: Function) {
    this.#fnList.push(fn)
    return this
  }

  unsubscribe(fn: Function) {
    this.#fnList = this.#fnList.filter((item) => item !== fn)
    return this
  }

  notify(params = {}) {
    this.#fnList.forEach((callback) => callback(params))
    return this
  }
}
