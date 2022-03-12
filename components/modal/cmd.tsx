import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OnShowCallback = (options: any) => void
type Callback = OnShowCallback

type Event = string

export const CmdManage = {
  list: new Map(),
  emitQueue: new Map(),
  on(event: Event, callback: Callback) {
    this.list.has(event) || this.list.set(event, [])
    this.list.get(event)!.push(callback)
    return this
  },

  off(event: Event, callback?: Callback) {
    if (callback) {
      const cb = this.list.get(event)!.filter((cb: Callback) => cb !== callback)
      this.list.set(event, cb)
      return this
    }
    this.list.delete(event)
    return this
  },

  cancelEmit(event: Event) {
    const timers = this.emitQueue.get(event)
    if (timers) {
      timers.forEach(clearTimeout)
      this.emitQueue.delete(event)
    }

    return this
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(event: Event, ...args: any[]) {
    this.list.has(event) &&
      this.list.get(event)!.forEach((callback: Callback) => {
        const timer = setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          callback(...args)
        }, 0)

        this.emitQueue.has(event) || this.emitQueue.set(event, [])
        this.emitQueue.get(event)!.push(timer)
      })
  },
}

export const CMD = <D extends { isOpen: boolean }>({
  render,
  event,
}: {
  render: (data?: D) => JSX.Element
  event: string
}) => {
  const [data, setData] = useState<D>()
  CmdManage.on(event, (data) => {
    setData(data)
  })

  useEffect(() => {
    return () => {
      CmdManage.off(event)
      CmdManage.cancelEmit(event)
    }
  }, [event])

  return render(data)
}
