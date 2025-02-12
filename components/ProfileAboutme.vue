<template>
  <!-- About Me -->
  <section class="fixed top-0 w-full h-full landing">
    <div
      class="absolute top-0 left-0 w-full h-[400px] image-placeholder animate-shimmer mask-gradient-y"
    >
      <VImage
        v-if="aboutMe?.img"
        src="https://res.cloudinary.com/dllsdiatn/image/upload/v1739274687/portfolio/profilepic_hxmnke.webp"
        alt="profile picture"
        class="relative h-full"
      />
    </div>
    <div class="relative top-[400px] h-[calc(100vh-400px)] overflow-y-auto">
      <div class="p-10 pt-0 h-full">
        <!-- Name -->
        <VText tag="h2" class="text-2xl font-bold text-primary-foreground">
          {{ aboutMe?.name }}
        </VText>
        <!-- Current Position -->
        <div>
          <VText class="text-primary font-semibold leading-5">{{ aboutMe?.currentPosition }}</VText>
          <VText class="text-primary">{{ aboutMe?.currentCompany }}</VText>
        </div>
        <!-- Links -->
        <div class="flex-y gap-3 py-8 text-primary">
          <VButton
            v-for="link in links"
            :key="link.name"
            class="flex-xy"
            @click="openLinkTo(link.url)"
          >
            <VIcon :name="link.name" size="xl" />
          </VButton>
          <VButton class="flex-xy" @click="openLinkTo(aboutMe?.cv as string)">
            <VIcon name="icon-attachment" size="lg" />
            <VText tag="span" class="text-sm underline hover:text-primary-foreground">
              Download CV
            </VText>
          </VButton>
        </div>
        <div
          class="pl-2 max-h-[50%] border-solid border-l border-primary"
          :class="!readMore ? 'h-[100px] overflow-hidden' : 'overflow-y-auto'"
        >
          <VText
            v-for="(p, index) in intro"
            :key="index"
            :class="[clamp, hide(index), index === 0 && 'mb-3']"
          >
            {{ p }}
          </VText>

          <VButton
            v-if="!readMore"
            class="relative bottom-2 text-sm text-primary-foreground font-semibold"
            @click="readMore = true"
            >Read More</VButton
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { profileData } = storeToRefs(useProfileDataStore())
const { retrieve } = useProfileDataStore()

const readMore = ref(false)

const links = [
  {
    name: 'icon-linkedin',
    url: 'https://www.linkedin.com/in/m-tomatao/'
  },
  {
    name: 'icon-github',
    url: 'https://github.com/martoms'
  },
  {
    name: 'icon-upwork',
    url: 'https://www.upwork.com/freelancers/~010e1495f770d6ef34?mp_source=share'
  }
]

const aboutMe = computed(() => profileData.value.find((i) => i.section === 'aboutMe'))
const intro = computed(() => aboutMe.value?.intro.split('\n') || [])
const clamp = computed(() => (!readMore.value ? 'line-clamp-3' : ''))

const hide = (index: number) => (index > 0 && !readMore.value ? 'hidden' : '')
const openLinkTo = (url: string) => window.open(url, '_blank')

onBeforeMount(() => !profileData.value.length && retrieve())
</script>
