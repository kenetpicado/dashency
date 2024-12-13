<script setup lang="ts">
import useAuth from '@/composables/useAuth'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const { auth } = storeToRefs(useAuthStore())
const { logout } = useAuth()
</script>

<template>
  <header class="bg-white w-full mx-auto py-4 px-6 flex justify-between items-center border-b">
    <section>
      <label for="sidebar" class="drawer-button lg:hidden">
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
    </section>

    <div v-if="auth" class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img
            alt="Profile"
            src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671159.jpg"
          />
        </div>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 shadow space-y-1"
      >
        <span class="menu-title"> {{ auth.name }} ({{ auth.role }}) </span>
        <li>
          <RouterLink :to="{ name: 'profile' }" class="p-2"> Perfil </RouterLink>
        </li>
        <li><button type="button" @click="logout" class="p-2">Salir</button></li>
      </ul>
    </div>
  </header>
</template>
