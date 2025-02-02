<template>
  <div class="flex-xy flex-col gap-2 md:h-[300px] md:max-h-[20vh] w-full">
    <VImage
      src="/images/name-logo.svg"
      alt="name-logo"
      class="flex-x xl:justify-start h-[60px] md:h-[100px] xl:h-[150px] w-full"
    />
    <div class="xl:w-full">
      <VText class="text-primary text-lg md:text-3xl font-semibold">
        Hi, I am a
        <VText tag="span">
          <VTyper
            :strings="['Software Engineer', 'Graphic Designer']"
            :typingSpeed="100"
            :backspaceSpeed="50"
            :delayBeforeStart="1000"
            :loop="true"
            @update="emits('changeBg', $event as 'Software Engineer' | 'Graphic Designer')"
            class="text-primary-foreground text-xl md:text-3xl font-extrabold"
          />
        </VText>
      </VText>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(['changeBg'])
</script>
