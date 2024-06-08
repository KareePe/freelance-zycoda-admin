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