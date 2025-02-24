export const useSession = async () => {
  const { code } = await useValidateFetch('/api/session')
  console.log('code', code)
}
