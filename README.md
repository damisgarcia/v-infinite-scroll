### Enhanced Description

`v-infinite-scroll` is a Vue 3 directive based on the Intersection Observer API. It provides a simple and performance-focused solution for loading new items in a `v-for` list as the user scrolls. By leveraging this directive, you can efficiently manage large lists by loading items incrementally, which enhances the user experience and reduces the initial load time.

### Installation

To install the `v-infinite-scroll` directive, you can use the following command with the Bun package manager:

```bash
bun add @damisgarcia/v-infinite-scroll
```

### Usage with Options

Here is an example of how to use the `v-infinite-scroll` directive with additional options such as `rootMargin`, `threshold`, `wait`, and `onComplete`:

```vue
<template>
  <div
    v-infinite-scroll="{ rootMargin: '0px', threshold: 0.15, wait: 400, onComplete: loadMoreItems }"
  >
    <div v-for="item in list" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { vInfiniteScroll } from '@damisgarcia/v-infinite-scroll'

const list = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
])

const loadMoreItems = () => {
  // Function to load more items and add them to the list
  const newItems = [
    { id: list.value.length + 1, name: `Item ${list.value.length + 1}` },
    { id: list.value.length + 2, name: `Item ${list.value.length + 2}` }
  ]
  list.value.push(...newItems)
}
</script>
```

### Options

1. **rootMargin**: This option sets a margin around the root container for the `IntersectionObserver`. A value of `'0px'` means the observation will occur exactly at the edge of the container.

2. **threshold**: This option defines the percentage of the target that must be visible before triggering the callback. A value of `0.15` means the callback will be triggered when 15% of the target is visible.

3. **wait**: This option sets the wait time (in milliseconds) to block new interactions, similar to a debounce functionality. This helps prevent multiple callback triggers in a short period.

4. **onComplete**: This option specifies the function that will be called when the scroll reaches the limit defined by the `IntersectionObserver`.

### Complete Example

```vue
<template>
  <div
    v-infinite-scroll="{ rootMargin: '0px', threshold: 0.15, wait: 400, onComplete: loadMoreItems }"
  >
    <div v-for="item in list" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { vInfiniteScroll } from '@damisgarcia/v-infinite-scroll'

const list = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
])

const loadMoreItems = () => {
  // Function to load more items and add them to the list
  const newItems = [
    { id: list.value.length + 1, name: `Item ${list.value.length + 1}` },
    { id: list.value.length + 2, name: `Item ${list.value.length + 2}` }
  ]
  list.value.push(...newItems)
}
</script>
```

With these options configured, you can have more precise control over when and how new items are loaded, improving both user experience and application performance.
