<template>
  <ItemForm @save="handleSubmit" @cancel="handleCancel" :is-pending="isPending" class="relative">
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
interface Props {
  skill: Skill
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

const handleSubmit = () => {}
</script>
