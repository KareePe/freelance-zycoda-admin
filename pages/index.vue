<template>
  <div class="md:ml-[300px] p-4 ml-0">
    <div class="bg-[#fff] rounded-xl p-4">
      <h1 class="text-3xl font-bold underline text-[var(--pink)]">
        Hello world!
      </h1>

      <Vueform>
        <TextElement name="hello_world" label="Hello" placeholder="World" />
      </Vueform>

      <UButton label="Open" @click="isOpen = true" />
    </div>

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
definePageMeta({
  middleware: "auth-middleware",
});

const isOpen = ref(false);

useHead({
  title: "Zycoda Admin",
  meta: [{ name: "description", content: "Zycoda Admin" }],
});
</script>
