<template>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
</template>
  
<script setup lang="ts">
useHead({
  title: 'Zycoda Admin',
  meta: [
    { name: 'description', content: 'Zycoda Admin' }
  ]
})
</script>

<style>
body{
  @apply bg-[#f5f5f5] dark:bg-[#262626]
}
</style>