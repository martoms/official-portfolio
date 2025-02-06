<template>
  <div class="p-5 md:p-12 w-full">
    <VText class="text-primary text-center italic md:text-2xl xl:text-lg">
      <VTyper
        v-if="content?.q"
        :strings="[content?.q]"
        :backspace="false"
        :typingSpeed="50"
        :loop="false"
        :hide-cursor-after="true"
        @update="showAuthor = true"
        class="text-wrap"
      />
    </VText>

    <VText
      class="mt-3 md:text-2xl xl:text-lg text-right text-primary font-semibold transition-smooth"
      :class="{ 'opacity-0': !showAuthor }"
    >
      -{{ content?.a }}
    </VText>
  </div>
</template>

<script lang="ts" setup>
type Props = { content: Quotes | null }
defineProps<Props>()

const showAuthor = ref(false)
</script>
