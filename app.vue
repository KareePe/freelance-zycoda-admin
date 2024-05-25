<template>
  <div>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>

    <Vueform>
      <TextElement name="hello_world" label="Hello" placeholder="World" />
    </Vueform>

    <UButton label="Open" @click="isOpen = true" />

    <UModal v-model="isOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <Placeholder class="h-8" />
        </template>

        <Placeholder class="h-32" />

        <template #footer>
          <Placeholder class="h-8" />
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false);
</script>
