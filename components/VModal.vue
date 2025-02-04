<template>
  <Teleport to="body">
    <div
      class="fixed h-screen w-screen top-0 left-0 p-2 md:p-10 bg-neutral-950/30 backdrop-blur-[1px] z-50 animate-fade-in"
    >
      <div class="relative w-full">
        <slot />
      </div>
    </div>
  </Teleport>
</template>
