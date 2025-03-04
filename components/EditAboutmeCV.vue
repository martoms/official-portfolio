<template>
  <VForm @save="handleSubmit" @cancel="emits('close')">
    <template #title>CV</template>
    <VInput id="cv" label="CV" :style="2" v-model="form.cv" />
  </VForm>
</template>

<script lang="ts" setup>
import { CVSchemaUpdateForm } from '@/schemas/profileData'

type Props = { aboutMe: AboutMe | undefined }
const props = defineProps<Props>()

const emits = defineEmits(['close'])

const profileDataStore = useProfileDataStore()

const form = ref({ cv: props.aboutMe?.cv })

const handleSubmit = async () => {
  if (form.value.cv === props.aboutMe?.cv) return

  try {
    const payload = CVSchemaUpdateForm.parse(form.value)

    const { code } = await useValidateFetch('api/aboutme/cv', payload, {
      method: 'PATCH'
    })

    if (code === 'CV_UPDATED') {
      profileDataStore.updateProfileData('aboutMe', payload as Partial<ProfileData>)
      emits('close')
    }
  } catch (e) {
    e instanceof Error && console.log(e.message)
  }
}
</script>
