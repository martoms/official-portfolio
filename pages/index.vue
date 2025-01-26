<template>
  <NuxtLayout name="landing">
    <template #header>
      <div class="flex-xy flex-col gap-2">
        <VImage src="/images/name-logo.svg" alt="name-logo" class="h-[60px]" />
        <div class="mt-3">
          <VText class="text-primary text-lg font-semibold">
            Hi, I am a
            <VText tag="span">
              <VTyper
                :strings="['Software Engineer', 'Graphic Designer']"
                :typingSpeed="100"
                :backspaceSpeed="50"
                :delayBeforeStart="1000"
                :loop="true"
                class="text-primary-foreground text-xl font-extrabold"
              />
            </VText>
          </VText>
        </div>
      </div>
    </template>
    <div class="h-full w-full landing">
      <!-- Topbar -->
      <div role="top-bar" class="h-[80px]"></div>
      <!-- Content -->
      <div role="content" class="flex-xy w-full h-[45%]">
        <VImage src="/images/avatar.svg" alt="avatar" class="h-[300px]" />
      </div>
    </div>
    <template #nav></template>
  </NuxtLayout>
</template>

<script lang="ts" setup></script>
