import { createToaster } from '@meforma/vue-toaster'

const toast = createToaster({
  position: 'bottom',
  duration: 3000,
  max: 2,
  pauseOnHover: false
})

export default toast