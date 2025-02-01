<template>
  <div class="relative flex flex-col h-screen w-screen landing overflow-hidden font-poppins">
    <!-- Background -->
    <div
      class="absolute h-[68%] w-full dev-bg transition-smooth"
      :class="currentBg === 'dev-bg' ? 'opacity-100' : 'opacity-0'"
    ></div>
    <div
      class="absolute h-[68%] w-full designer-bg transition-smooth"
      :class="currentBg === 'designer-bg' ? 'opacity-100' : 'opacity-0'"
    ></div>
    <header
      role="banner"
      aria-labelledby="site-name"
      class="relative flex-initial z-10 order-2 w-full"
    >
      <slot name="header" />
    </header>
    <nav role="navigation" class="relative z-10 order-3 h-[280px] w-full">
      <slot name="nav" />
    </nav>
    <main role="main" class="flex flex-1 flex-col order-1 w-full">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  currentBg: 'dev-bg' | 'designer-bg'
}

defineProps<Props>()
</script>
