<template>
  <div class="h-screen w-screen overflow-hidden font-Poppins">
    <header role="banner" aria-labelledby="site-name" class="fixed w-full top-[55%]">
      <slot name="header" />
    </header>
    <nav role="navigation">
      <slot name="nav" />
    </nav>
    <main role="main" class="h-full w-full">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup></script>
