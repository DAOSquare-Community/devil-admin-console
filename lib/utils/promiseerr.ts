// to function
export function promiseErr<T>(promise: Promise<T>) {
  return promise
    .then((data) => {
      return [null, data]
    })
    .catch((err) => [err as Error]) // es6的返回写法
}
