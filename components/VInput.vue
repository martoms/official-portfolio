<template>
  <div
    ref="containerEl"
    class="relative flex-x flex-col gap-2 text-primary bg-inherit mb-1"
    @click="isActive = true"
  >
    <template v-if="!style">
      <VText tag="label" :for="id">{{ label }}</VText>
      <input
        :id="id"
        :type="!type ? 'text' : type"
        v-model="model"
        class="p-2 rounded-md border-none outline-none outline-0 focus:outline-1 outline-primary"
      />
    </template>
    <template v-if="style === 2">
      <VText
        tag="label"
        :for="id"
        class="absolute -top-2 left-2 bg-inherit px-2 text-sm font-semibold"
        :class="isActive ? 'text-primary-foreground' : 'text-primary'"
      >
        {{ label }}
      </VText>
      <input
        :id="id"
        :type="!type ? 'text' : type"
        v-model="model"
        class="h-full w-full p-2 bg-inherit rounded-md border-solid border border-secondary focus:border-primary outline-none outline-0 focus:outline-1 outline-primary"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  id: string
  type?: 'text' | 'number' | 'password' | 'date'
  label?: string
  style?: 2
}
const props = defineProps<Props>()

const [model, modifiers] = defineModel<number | string>({
  get(value) {
    if (props.type === 'date' && modifiers.milliseconds && value !== undefined) {
      return new Date(value).toISOString().split('T')[0]
    }
    return value
  },
  set(value) {
    if (props.type === 'date' && modifiers.milliseconds) {
      return typeof value === 'string' ? new Date(value).getTime() : value
    }
    return value
  }
})

const containerEl = ref()
const isActive = ref(false)

onClickOutside(containerEl, () => (isActive.value = false))
</script>
