<template>
  <VForm @save="handleSubmit" @cancel="emits('close')">
    <template #title>Current Position</template>
    <VInput
      id="intro"
      label="Intro"
      :style="2"
      type="textarea"
      v-model="form.intro"
      class="h-[200px]"
    />
  </VForm>
</template>

<script lang="ts" setup>
import { IntroPositionSchemaUpdateForm } from '@/schemas/profileData'

type Props = { aboutMe: AboutMe | undefined }
const props = defineProps<Props>()

const emits = defineEmits(['close'])

const profileDataStore = useProfileDataStore()

const form = ref({ intro: props.aboutMe?.intro })

const handleSubmit = async () => {
  if (form.value.intro === props.aboutMe?.intro) return

  try {
    const payload = IntroPositionSchemaUpdateForm.parse(form.value)

    const { code } = await useValidateFetch('api/aboutme/intro', payload, {
      method: 'PATCH'
    })

    if (code === 'INTRO_UPDATED') {
      profileDataStore.updateProfileData('aboutMe', payload as Partial<ProfileData>)
      emits('close')
    }
  } catch (e) {
    e instanceof Error && console.log(e.message)
  }
}
</script>
