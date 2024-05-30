<template>
  <div class="lg:ml-[300px] p-8 ml-0">
    <div class="bg-[#fff] rounded-xl p-8">
       
      <h1 class="text-[35px] font-bold text-[var(--pink)]">
       จัดการบทความ
      </h1>

      <Vueform>
        <TextElement name="hello_world" label="Hello" placeholder="World" />
      </Vueform>

      <UButton label="Open" @click="fn_openDialogAdd" />
    </div>

    <DialogAddBlog :show="isOpen" :onClose="closeDialog"/>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth-middleware",
});

const isOpen = ref(false);

const fn_openDialogAdd = () => {
  isOpen.value = true
}

const closeDialog = () => {
  isOpen.value = false
}

useHead({
  title: "Zycoda Admin",
  meta: [{ name: "description", content: "Zycoda Admin" }],
});
</script>
