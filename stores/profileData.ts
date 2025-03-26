import { SkillsSchema } from '@/schemas/profileData'

export const useProfileDataStore = defineStore('profileData', () => {
  const _profileData = ref<ProfileData>([])
  const profileData = computed(() => _profileData.value)

  const setProfileData = (data: ProfileData) => (_profileData.value = data)

  const updateSkillData = (category: SkillCategory, skill: Skill, action: 'add' | 'remove') => {
    const skillsDataIndex = _profileData.value.findIndex((d) => d.section === 'skills')
    const parsedSkillsData = SkillsSchema.safeParse(_profileData.value[skillsDataIndex])

    if (skillsDataIndex !== -1 && parsedSkillsData.success) {
      if (action === 'add') {
        parsedSkillsData.data[category].push(skill)
      } else if (action === 'remove') {
        parsedSkillsData.data[category] = parsedSkillsData.data[category].filter(
          (s) => s.name !== skill.name
        )
      }
      _profileData.value.splice(skillsDataIndex, 1, parsedSkillsData.data)
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
    updateSkillData
  }
})
