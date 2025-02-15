<template>
  <div ref="skillsSectionEl" class="fixed w-full h-full landing transition-smooth-300">
    <div
      class="absolute top-0 left-0 flex items-end w-full h-[300px] pr-12 bg-blue-300 mask-gradient-y"
    >
      <VText
        class="relative bottom-[100px] w-full text-right text-5xl leading-[3rem] font-black text-primary-background"
      >
        Skills
        <VText tag="span" class="text-primary font-thin"> &<br /></VText>
        <VText tag="span" class="text-primary-foreground">Technologies</VText>
      </VText>
    </div>
    <div class="relative top-[300px] h-[calc(100vh-300px)] p-5 overflow-auto">
      <div v-for="skill in skillSet" :key="skill.name" class="flex-x w-full">
        <ProfileSkillsCategory :category="skill.name" :skills="skill.skills" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SkillsSchema } from '@/schemas/profileData'

const { profileData } = storeToRefs(useProfileDataStore())

const emits = defineEmits<{
  (e: 'assign', el: HTMLElement | null): void
}>()

const skillsSectionEl = ref()

const backendSkills = computed(() => getSkills('backend'))
const frontendSkills = computed(() => getSkills('frontend'))
const graphicDesignSkills = computed(() => getSkills('graphicDesign'))
const othersSkills = computed(() => getSkills('others'))

const skillSet = computed(() => {
  return [
    {
      name: 'Backend',
      skills: backendSkills.value
    },
    {
      name: 'Frontend',
      skills: frontendSkills.value
    },
    {
      name: 'Others',
      skills: othersSkills.value
    },
    {
      name: 'Graphic Design',
      skills: graphicDesignSkills.value
    }
  ]
})

function getSkills(category: 'backend' | 'frontend' | 'graphicDesign' | 'others') {
  const parsedSkills = SkillsSchema.safeParse(profileData.value.find((d) => d.section === 'skills'))
  return parsedSkills.success ? parsedSkills.data[category] : []
}

onMounted(() => emits('assign', skillsSectionEl.value))
</script>
