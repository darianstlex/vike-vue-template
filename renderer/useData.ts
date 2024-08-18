// https://vike.dev/useData
import type { App, InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

const key: InjectionKey<Ref<unknown>> = Symbol()

/** https://vike.dev/useData */
export const useData = <Data>(): Ref<Data> => {
  const data = inject(key)
  if (!data) throw new Error('setData() not called')
  return data as Ref<Data>
}

export const setData = (app: App, data: Ref<unknown>): void => {
  app.provide(key, data)
}
