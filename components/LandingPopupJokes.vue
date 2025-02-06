<template>
  <div class="p-5 md:p-12 w-full">
    <VText
      class="text-primary md:text-2xl xl:text-lg"
      :class="{ 'text-center': content?.type === 'single' }"
    >
      <VTyper
        v-if="content"
        :strings="[joke]"
        :backspace="false"
        :typingSpeed="50"
        :loop="false"
        :hide-cursor-after="true"
        class="text-wrap"
        @update="showAction = true"
      />
    </VText>

    <div
      v-if="isTwopartType && showAction"
      class="flex-xy p-3 mt-3 w-full text-primary-background rounded-md animate-fade-in"
      :class="!showDelivery ? 'bg-primary cursor-pointer' : 'bg-secondary'"
      @click="showDelivery = true"
    >
      <VText>
        {{ showDelivery ? delivery : 'Tell Me!' }}
      </VText>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SingleJokeSchema, TwopartJokeSchema } from '@/schemas/landingContents'

type Props = { content: Joke | null }
const { content } = defineProps<Props>()

const showAction = ref(false)
const showDelivery = ref(false)

const isSingleType = computed(() => SingleJokeSchema.safeParse(content).success)
const isTwopartType = computed(() => TwopartJokeSchema.safeParse(content).success)

const joke = computed(() => {
  if (content && isSingleType.value && 'joke' in content) return content.joke
  if (content && isTwopartType.value && 'setup' in content) return content.setup
  return ''
})

const delivery = computed(() => {
  if (content && isTwopartType.value && 'delivery' in content) return content.delivery
  return ''
})
</script>
