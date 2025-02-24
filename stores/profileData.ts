export const useProfileDataStore = defineStore('profileData', () => {
  const _profileData = ref<ProfileData>([])
  const profileData = computed(() => _profileData.value)

  const setProfileData = (data: ProfileData) => (_profileData.value = data)

  return {
    profileData,
    setProfileData
  }
})
