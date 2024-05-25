<template>
  <nav class="max-w-[300px] w-full h-[100vh] fixed">
    <div class="bg-[#fff] h-full w-full">
      <div class="px-6 py-12">
        <img
          src="/images/logo/dark/logo-dark.png"
          class="w-[150px]"
          alt="logo zycoda"
        />
        <hr class="border-b border-[var(--black)]/10 mt-[25px]" />
      </div>
      <div>
        <ul class="px-2">
          <li class="px-4 group transition-all duration-150 rounded-xl hover:bg-[#e3e6f6] flex items-center gap-4 h-[45px]">
            <NuxtLink to="/" class="!text-[#8b92bd] w-full block group-hover:!text-[var(--blue)] group-hover:font-bold transition-all duration-150">Home</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style></style>
