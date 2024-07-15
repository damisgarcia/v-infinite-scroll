import { type Directive } from 'vue'

import { useDebounceFn } from '@vueuse/core'

interface vInfiniteScrollBindings {
  rootMargin: string
  threshold: number
  wait: number
  onComplete(): void
}

function appendTriggerElement(el: Element) {
  const trigger = document.createElement('span')
  trigger.id = 'trigger'
  el.appendChild(trigger)
  return trigger
}

export const vInfiniteScroll = {
  mounted(el: HTMLElement, bindings) {
    const params = bindings.value as vInfiniteScrollBindings

    if (el.children.length > 1) {
      throw 'vInfineScroll: Expected single child element'
    }

    const trigger = appendTriggerElement(el)

    const handleIntersection = useDebounceFn((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          params.onComplete()
        }
      })
    }, params.wait || 200) // default 200ms

    const options = {
      root: el,
      rootMargin: '0px',
      threshold: 0.5
    }

    const observer = new IntersectionObserver(handleIntersection, options)
    observer.observe(trigger)
  }
} as Directive