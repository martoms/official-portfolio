<template>
  <NuxtLayout name="landing">
    <template #header></template>
    <div class="h-full w-full landing">
      <!-- Topbar -->
      <div role="top-bar" class="h-[80px]"></div>
      <!-- Content -->
      <div role="content" class="flex items-center justify-center w-full h-[45%]">
        <VImage src="/images/avatar.svg" alt="avatar" class="h-[300px]" />
      </div>
    </div>
    <template #nav></template>
  </NuxtLayout>
</template>

<script lang="ts" setup></script>
