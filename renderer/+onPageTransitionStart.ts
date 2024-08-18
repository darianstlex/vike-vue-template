// https://vike.dev/onPageTransitionStart
import type { OnPageTransitionStartAsync } from 'vike/types'

export const onPageTransitionStart: OnPageTransitionStartAsync = async (): ReturnType<OnPageTransitionStartAsync> => {
  document.querySelector('body')!.classList.add('page-is-transitioning')
}
