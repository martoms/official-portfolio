<template>
  <section id="about-me" class="fixed top-0 w-full h-full landing">
    <div
      class="absolute top-0 left-0 w-full h-[400px] image-placeholder animate-shimmer mask-gradient-y"
    >
      <VImage
        v-if="aboutMe?.img"
        src="https://res.cloudinary.com/dllsdiatn/image/upload/v1739274687/portfolio/profilepic_hxmnke.webp"
        alt="profile picture"
        class="relative h-full"
      >
      </VImage>
      <VEditIcon />
    </div>
    <div class="relative top-[400px] h-[calc(100vh-400px)] overflow-y-auto">
      <div class="p-10 pt-0 h-full">
        <!-- Name -->
        <VText tag="h2" class="text-2xl font-bold text-primary-foreground">
          {{ aboutMe?.name }}
        </VText>
        <!-- Current Position -->
        <div class="relative">
          <VText class="text-primary font-semibold leading-5">
            {{ aboutMe?.currentPosition }} ·
            <VText tag="span" class="font-normal text-sm">
              {{ getDuration(aboutMe?.start || 0) }}
            </VText>
          </VText>
          <VText class="text-primary">
            {{ aboutMe?.currentCompany }}
          </VText>
          <VEditIcon @click="editCurrentposition = true" />
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
            <VText tag="span" class="relative text-sm underline hover:text-primary-foreground">
              Download CV
              <VEditIcon @click="editCV = true" />
            </VText>
          </VButton>
        </div>
        <div
          class="relative pl-2 max-h-[50%] border-solid border-l border-primary"
          :class="[!readMore ? 'h-[100px]' : 'overflow-y-auto', !editData && 'overflow-hidden']"
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
          <VEditIcon @click="editIntro = true" />
        </div>
      </div>
    </div>
    <EditAboutmeCurrentposition
      v-if="editCurrentposition"
      :about-me="aboutMe"
      @close="editCurrentposition = false"
    />
    <EditAboutmeIntro v-if="editIntro" :about-me="aboutMe" @close="editIntro = false" />
    <EditAboutmeCV v-if="editCV" :about-me="aboutMe" @close="editCV = false" />
  </section>
</template>

<script lang="ts" setup>
import { AboutMeSchema } from '@/schemas/profileData'
import { commonUtils } from '@/utils/common'

const { editData } = storeToRefs(useSettingsStore())
const { profileData } = storeToRefs(useProfileDataStore())

const { openLinkTo, getDuration } = commonUtils()

const readMore = ref(false)
const editCurrentposition = ref(false)
const editIntro = ref(false)
const editCV = ref(false)

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

const aboutMe = computed(() => {
  const parsedData = AboutMeSchema.safeParse(profileData.value.find((i) => i.section === 'aboutMe'))
  return parsedData.success ? parsedData.data : undefined
})
const intro = computed(() => aboutMe.value?.intro.split('\n') || [])
const clamp = computed(() => (!readMore.value ? 'line-clamp-3' : ''))

const hide = (index: number) => (index > 0 && !readMore.value ? 'hidden' : '')
</script>
