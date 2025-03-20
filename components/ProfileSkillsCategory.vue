<template>
  <div class="relative flex-xy gap-5 flex-col p-10 w-full">
    <VText
      tag="h3"
      class="w-full text-center text-lg text-primary pb-3 font-thin border-primary-foreground-b"
    >
      {{ category }}
    </VText>
    <div class="relative grid grid-cols-3 w-full gap-5">
      <div
        v-for="skill in skills"
        :key="skill.name"
        class="justify-self-center flex-y justify-between flex-col gap-1 h-[80px] w-[80px]"
      >
        <VImage
          :src="skill.img"
          :alt="skill.name"
          object-fit="contain"
          class="h-full grayscale hover:grayscale-0 hover:drop-shadow-md transition-smooth-300"
        />
        <VText class="text-sm text-primary font-thin">{{ skill.name }}</VText>
      </div>
      <VAddIcon @click="addSkill = true" />
      <VEditIcon />

      <AddSkill v-if="addSkill" :category :order="nextOrder" @close="addSkill = false" />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  skills: Array<Skill>
  category: string
}
const props = defineProps<Props>()

const addSkill = ref(false)
const nextOrder = computed(() => {
  return Math.max(...props.skills.map((skill) => skill.order)) + 1
})
</script>
