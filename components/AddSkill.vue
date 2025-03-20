<template>
  <VForm @save="handleSubmit" @cancel="emits('close')" action="add" :is-pending="isPending">
    <template #title>Add Skill ({{ category }})</template>
    <VInput id="name" label="Name" :style="2" v-model="form.name" />
    <VInput
      id="img"
      label="Image"
      type="file"
      accept="image"
      @input:file="handleFileInput($event)"
    />
  </VForm>
</template>

<script lang="ts" setup>
import { SkillSchema } from '@/schemas/profileData'
interface Props {
  category: string
  order: number
}
const props = defineProps<Props>()

const emits = defineEmits(['close'])

const profileData = useProfileDataStore()

interface Form {
  name: string
  img: File | null
  order: number
}

const formData = new FormData()
const form = ref<Form>({
  name: '',
  img: null,
  order: props.order
})
const isPending = ref(false)

const category = computed(() => {
  switch (props.category) {
    case 'Backend':
      return 'backend'
    case 'Frontend':
      return 'frontend'
    case 'Graphic Design':
      return 'graphicDesign'
    case 'Others':
      return 'others'
    default:
      return 'others'
  }
})

const handleFileInput = (e: HTMLInputElement) => {
  if (!e.files?.[0]) return
  form.value.img = e.files?.[0]
  formData.append('img', form.value.img)
}

const handleSubmit = async () => {
  try {
    isPending.value = true
    formData.append('name', form.value.name)
    formData.append('order', form.value.order.toString())
    formData.append('category', category.value)

    const { code, data } = await useValidateFetch('api/skills', formData, {
      method: 'POST'
    })

    if (code === 'SKILL_ADDED') {
      const skill = SkillSchema.parse(data)
      profileData.addSkill(category.value, skill)
      emits('close')
    }
  } catch (e) {
    e instanceof Error && console.log(e.message)
  } finally {
    isPending.value = false
  }
}
</script>
