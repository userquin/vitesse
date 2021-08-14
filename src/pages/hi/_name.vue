<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useTitle } from '@vueuse/core'
import { useHead } from '@vueuse/head'

const props = defineProps<{ name: string }>()
const router = useRouter()
const { t } = useI18n()
const title = useTitle()

useHead({
  title: `Hi ${props.name}`,
  meta: [
    { name: 'og:title', description: `Hi ${props.name}` },
  ],
})

watch(() => props.name, (name) => {
  title.value = `Hi ${name || ''}`
}, { immediate: true })
</script>

<template>
  <div>
    <p class="text-4xl">
      <carbon-pedestrian class="inline-block" />
    </p>
    <p>
      {{ t('intro.hi', { name: props.name }) }}
    </p>
    <p class="text-sm opacity-50">
      <em>{{ t('intro.dynamic-route') }}</em>
    </p>

    <div>
      <button
        class="btn m-3 text-sm mt-8"
        @click="router.back()"
      >
        {{ t('button.back') }}
      </button>
    </div>
  </div>
</template>
