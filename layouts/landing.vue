<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 h-screen w-screen landing overflow-hidden font-poppins"
  >
    <!-- Background -->
    <div
      class="fixed h-[68%] xl:h-full dev-bg w-full transition-smooth"
      :class="currentBg === 'dev-bg' ? 'opacity-100' : 'opacity-0'"
    ></div>
    <!-- top-[60px] is based on the topbar height -->
    <div class="relative flex flex-col xl:flex-row h-full w-full">
      <div
        class="absolute h-[68%] w-full designer-bg transition-smooth"
        :class="currentBg === 'designer-bg' ? 'opacity-100' : 'opacity-0'"
      ></div>
      <header
        role="banner"
        aria-labelledby="site-name"
        class="relative xl:top-[60px] xl:flex-y flex-initial xl:w-1/2 xl:h-landing-xl z-10 order-2"
      >
        <slot name="header" />
      </header>
      <nav
        role="navigation"
        class="relative xl:absolute xl:-bottom-12 z-10 order-3 h-[280px] w-full"
      >
        <slot name="nav" />
      </nav>
      <main
        role="main"
        class="relative xl:top-[60px] flex flex-1 flex-col order-1 w-full xl:h-landing-xl xl:w-1/2"
      >
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  currentBg: 'dev-bg' | 'designer-bg'
}

defineProps<Props>()
</script>
