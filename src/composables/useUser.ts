import router from '@/router'

export default function useUser() {
  function register(): void {
    router.push({ name: 'login' })
  }

  function login(): void {
    router.push({ name: 'home' })
  }

  function logout(): void {
    router.push({ name: 'login' })
  }

  return { login, register, logout }
}
