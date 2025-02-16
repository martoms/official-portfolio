<template>
  <VButton
    v-if="!isExpanded"
    class="fixed top-5 left-5 text-primary-background"
    @click="isExpanded = true"
  >
    <VIcon name="icon-menu-burger" size="3xl" />
  </VButton>
  <div
    ref="navEl"
    class="fixed top-0 left-0 z-20 h-full pt-[100px] bg-secondary/80 backdrop-blur-sm transition-smooth-300"
    :class="!isExpanded ? 'w-0' : 'p-5 w-80'"
  >
    <VButton
      v-if="isExpanded"
      class="absolute top-5 left-5 text-primary-background"
      @click="isExpanded = false"
    >
      <VIcon name="icon-close" size="3xl" />
    </VButton>

    <nav v-if="isExpanded">
      <ul class="text-primary-background">
        <li
          v-for="nav in navigations"
          :key="nav.name"
          class="mb-2 p-3 rounded-md"
          :class="route.fullPath === nav.link && 'bg-primary'"
          @click="route.fullPath !== nav.link && handleClickNav(nav)"
        >
          {{ nav.name }}
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { get } from 'http'
import { useRoute, useRouter } from 'vue-router'

const emits = defineEmits<{
  (e: 'scrollY', y: number): void
}>()

const navEl = ref()
const isExpanded = ref(false)
const route = useRoute()
const router = useRouter()

const navigations: Array<Navigation> = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'Profile',
    link: '/profile'
  },
  {
    name: 'About Me',
    link: '/profile#about-me'
  },
  {
    name: 'Skills',
    link: '/profile#skills'
  },
  {
    name: 'Awards & Certificates',
    link: '/profile#awards-and-certificates'
  }
]

const { height } = useElementBounding(navEl)

const scroll = (nav: NavigationTitle) => {
  const getY = () => {
    switch (nav) {
      case 'About Me':
        return height.value - height.value
      case 'Skills':
        return height.value - height.value * 2
      case 'Awards & Certificates':
        return height.value - height.value * 3
      default:
        return undefined
    }
  }
  const y = getY()
  y !== undefined && emits('scrollY', y)
}

const handleClickNav = (nav: Navigation) => {
  router.push(nav.link)
  scroll(nav.name)
}

onClickOutside(navEl, () => (isExpanded.value = false))
</script>
