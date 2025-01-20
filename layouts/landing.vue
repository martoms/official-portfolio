<template>
  <!-- wrapper -->
  <div class="h-screen w-screen overflow-hidden">
    <header>
      <slot name="header" />
    </header>
    <nav>
      <slot name="nav" />
    </nav>
    <main class="h-full w-full">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup></script>
