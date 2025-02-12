import { z } from 'zod'
import { defineStore } from 'pinia'
import { useValidateFetch } from '@/composables/useValidateFetch'
import { ProfileDataSchema } from '@/schemas/profileData'

export const useProfileDataStore = defineStore('profileData', () => {
  const profileData = ref<ProfileData>([])
  const isPending = ref(false)

  const retrieve = async () => {
    isPending.value = true

    try {
      const { data, code } = await useValidateFetch('api/data/profile')

      if (code === 'NOT_FOUND') console.log('profileData:', code)
      const parsedProfileData = ProfileDataSchema.parse(data)
      profileData.value = parsedProfileData
    } catch (e) {
      if (e instanceof Error) console.log('error', e.message)
    }
  }

  return { profileData, isPending, retrieve }
})
