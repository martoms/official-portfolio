export const useProfileDataStore = defineStore('profileData', () => {
  const _profileData = ref<ProfileData>([])
  const profileData = computed(() => _profileData.value)

  const setProfileData = (data: ProfileData) => (_profileData.value = data)

  const updateProfileData = (section: string, update: Partial<ProfileData>) => {
    _profileData.value = _profileData.value.map((d) => {
      if (d.section === section) return { ...d, ...update }
      return d
    })
  }

  return {
    profileData,
    setProfileData,
    updateProfileData
  }
})
