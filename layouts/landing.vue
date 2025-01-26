<template>
  <div class="h-screen w-screen overflow-hidden">
    <header role="banner" aria-labelledby="site-name" class="fixed">
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
