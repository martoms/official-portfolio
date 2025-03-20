<template>
  <div class="w-full p-5 my-5 border-secondary">
    <VText tag="h3" class="text-primary-foreground font-semibold">{{ certificate.title }}</VText>
    <VText class="text-primary text-sm">{{ certificate.description }}</VText>
    <div class="relative w-full rounded-md overflow-hidden">
      <VImage
        ref="imgEl"
        :src="certificate.img"
        :alt="certificate.title"
        class="w-full mt-5"
        @click="showViewBtn = true"
      />
      <div
        v-if="showViewBtn"
        class="absolute top-0 left-0 flex-xy w-full h-full p-10 bg-slate-200/30 backdrop-blur-[2px]"
      >
        <VButton
          btn-style="full"
          class="bg-primary hover:bg-primary-hover text-primary-background"
          @click="openLinkTo(certificate.url)"
        >
          View
        </VButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { commonUtils } from '@/utils/common'

interface Props {
  certificate: Certificate
}
defineProps<Props>()

const { openLinkTo } = commonUtils()

const imgEl = ref()
const showViewBtn = ref(false)

onClickOutside(imgEl, () => (showViewBtn.value = false))
</script>
