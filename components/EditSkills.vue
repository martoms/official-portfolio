<template>
  <VModal centered>
    <div ref="containerEl" id="edit-skills" class="modal-container">
      <VText class="form-title"> Skills ({{ category }}) </VText>
      <div class="flex flex-col gap-10 border-primary p-5 h-[500px] overflow-y-auto">
        <EditSkillsForm v-for="skill in skills" :key="skill.name" :skill="skill" :category />
      </div>
    </div>
  </VModal>
</template>

<script lang="ts" setup>
interface Props {
  skills: Skill[]
  category: string
}
defineProps<Props>()

const emits = defineEmits(['close'])
const containerEl = ref()

onClickOutside(containerEl, () => emits('close'))
</script>
