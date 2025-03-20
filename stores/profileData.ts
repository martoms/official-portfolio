import { SkillsSchema } from '@/schemas/profileData'

export const useProfileDataStore = defineStore('profileData', () => {
  const _profileData = ref<ProfileData>([])
  const profileData = computed(() => _profileData.value)

  const setProfileData = (data: ProfileData) => (_profileData.value = data)

  const addSkill = (category: SkillCategory, skill: Skill) => {
    const skillsDataIndex = _profileData.value.findIndex((d) => d.section === 'skills')
    if (skillsDataIndex !== -1) {
      const parsedSkillsData = SkillsSchema.safeParse(_profileData.value[skillsDataIndex])
      if (parsedSkillsData.success) {
        parsedSkillsData.data[category].push(skill)
        _profileData.value.splice(skillsDataIndex, 1, parsedSkillsData.data)
      }
    }
  }

  const updateProfileData = (section: string, update: Partial<ProfileData>) => {
    _profileData.value = _profileData.value.map((d) => {
      if (d.section === section) return { ...d, ...update }
      return d
    })
  }

  return {
    profileData,
    setProfileData,
    updateProfileData,
    addSkill
  }
})
