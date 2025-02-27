export const useSettingsStore = defineStore('settings', () => {
  const _sessionRetrieved = ref(false)
  const _isAdmin = ref(false)
  const _editData = ref(false)

  const sessionRetrieved = computed(() => _sessionRetrieved.value)
  const isAdmin = computed(() => _isAdmin.value)
  const editData = computed(() => _editData.value)

  const setSessionsRetrieved = (val: boolean) => (_sessionRetrieved.value = val)
  const setIsAdmin = (val: boolean) => (_isAdmin.value = val)
  const setEditData = (val: boolean) => (_editData.value = val)

  return {
    sessionRetrieved,
    isAdmin,
    editData,
    setSessionsRetrieved,
    setIsAdmin,
    setEditData
  }
})
