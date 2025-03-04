<template>
  <VForm @save="handleSubmit" @cancel="emits('close')">
    <template #title>Current Position</template>
    <VInput id="title" label="Title" :style="2" v-model="form.newTitle" />
    <VInput id="company" label="Company" :style="2" v-model="form.newCompany" />
    <VInput
      id="start-date"
      label="Start Date"
      :style="2"
      type="date"
      v-model.milliseconds="form.newStartDate"
    />
  </VForm>
</template>

<script lang="ts" setup>
import { CurrentPositionSchemaUpdateForm } from '@/schemas/profileData'
import { commonUtils } from '@/utils/common'

type Props = { aboutMe: AboutMe | undefined }
const props = defineProps<Props>()

const emits = defineEmits(['close'])

const profileDataStore = useProfileDataStore()
const { removeUndefined } = commonUtils()

const form = ref({
  newTitle: props.aboutMe?.currentPosition,
  newCompany: props.aboutMe?.currentCompany,
  newStartDate: props.aboutMe?.start
})

const handleSubmit = async () => {
  try {
    const newValues = {
      currentPosition:
        form.value.newTitle !== props.aboutMe?.currentPosition ? form.value.newTitle : undefined,
      currentCompany:
        form.value.newCompany !== props.aboutMe?.currentCompany ? form.value.newCompany : undefined,
      start: form.value.newStartDate !== props.aboutMe?.start ? form.value.newStartDate : undefined
    }

    const payload = CurrentPositionSchemaUpdateForm.parse(newValues)

    const { code } = await useValidateFetch('api/aboutme/currentposition', payload, {
      method: 'PATCH'
    })

    if (code === 'CURRENT_POSITION_UPDATED') {
      profileDataStore.updateProfileData(
        'aboutMe',
        removeUndefined(payload) as Partial<ProfileData>
      )
      emits('close')
    }
  } catch (e) {
    e instanceof Error && console.log(e.message)
  }
}
</script>
