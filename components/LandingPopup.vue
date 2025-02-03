<template>
  <VDialogue @close="emits('close')">
    <template #footer>
      <VText class="w-full p-3 text-right text-sm text-secondary">
        {{ attribution.text }}
        <VText
          tag="a"
          :href="attribution.link"
          target="_blank"
          class="text-blue-500 font-semibold hover:underline"
        >
          {{ attribution.name }}
        </VText>
      </VText>
    </template>
  </VDialogue>
</template>

<script lang="ts" setup>
const { attribution, content } = storeToRefs(useLandingContentsStore())
const { getContent } = useLandingContentsStore()

onBeforeMount(() => getContent())

watch(content, () => console.log(content.value), { immediate: true })

const emits = defineEmits(['close'])
</script>
