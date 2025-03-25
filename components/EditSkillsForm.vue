<template>
  <ItemForm
    @save="handleSubmit"
    @cancel="handleCancel"
    @confirm:delete="handleDelete"
    :is-pending="isPending"
    :name="skill.name"
    class="relative"
  >
    <VInput id="skill" label="Skill" :style="2" v-model="form.name" />
    <VInput
      id="img"
      label="Image"
      type="file"
      accept="image"
      :image-preview="imagePreview || skill.img"
      @input:file="handleFileInput($event)"
    />
  </ItemForm>
</template>

<script lang="ts" setup>
import { SkillsDeleteSchema } from '@/schemas/skillsData'

interface Props {
  skill: Skill
  category: string
}
const props = defineProps<Props>()

interface Form {
  name: string
  img: File | null
  order: number
}

const formData = new FormData()
const form = ref<Form>({
  name: props.skill.name,
  img: null,
  order: props.skill.order
})
const imagePreview = ref()
const isPending = ref(false)

const categoryEnumValue = computed(() => {
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
  imagePreview.value = URL.createObjectURL(form.value.img)
  formData.append('img', form.value.img)
}

const handleCancel = () => {
  imagePreview.value = null
  form.value.img = null
  form.value.name = props.skill.name
  form.value.order = props.skill.order
}

const handleDelete = async () => {
  try {
    isPending.value = true
    const payload = SkillsDeleteSchema.parse({
      category: categoryEnumValue.value,
      name: props.skill.name,
      img: props.skill.img
    })
    const { code, data } = await useValidateFetch('api/skills', payload, {
      method: 'DELETE'
    })
    console.log('code', code, 'data', data)
  } catch (e) {
    e instanceof Error && console.log(e.message)
  } finally {
    isPending.value = false
  }
}

const handleSubmit = () => {}
</script>
