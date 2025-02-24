export default defineNuxtRouteMiddleware(async (to) => {
  const settings = useSettingsStore()
  const { sessionRetrieved } = storeToRefs(settings)

  if (import.meta.server) return

  if (to.path !== '/admin' && to.path !== '/logout') {
    if (!sessionRetrieved.value) {
      const { code } = await useValidateFetch('/api/session')
      if (code === 'IS_ADMIN') settings.setIsAdmin(true)
      settings.setSessionsRetrieved(true)
    }
  }
})
