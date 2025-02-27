<template>
  <section
    ref="awardsSection"
    id="awards-and-certificates"
    class="fixed w-full h-full landing transition-smooth-300"
  >
    <div
      class="absolute top-0 left-0 flex items-end w-full h-[300px] pr-10 bg-slate-300 mask-gradient-y"
    >
      <VText
        class="relative bottom-[100px] w-full text-right text-5xl leading-[3rem] font-black text-primary-background"
      >
        Awards
        <VText tag="span" class="text-primary font-thin"> &<br /></VText>
        <VText tag="span" class="text-primary-foreground">Certificates</VText>
      </VText>
    </div>
    <div class="relative top-[300px] h-[calc(100vh-300px)] p-5 overflow-auto">
      <div>
        <div v-for="certificate in certificates" :key="certificate.title" class="relative">
          <ProfileAwardsCertificate :certificate="certificate" />
          <VEditIcon />
        </div>
        <VAddIcon />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { AwardsSchema } from '@/schemas/profileData'

const { profileData } = storeToRefs(useProfileDataStore())

const emits = defineEmits<{
  (e: 'assign', el: HTMLElement | null): void
}>()

const awardsSection = ref()

const certificates = computed(() => {
  const parsedSkills = AwardsSchema.safeParse(profileData.value.find((d) => d.section === 'awards'))
  return parsedSkills.success ? parsedSkills.data.certificates : []
})

onMounted(() => emits('assign', awardsSection.value))
</script>
