<template>
  <nav
    class="max-w-[300px] w-full h-[100vh] fixed lg:left-0 -left-[300px] z-[9] transition-all duration-300 sidebar"
  >
    <div class="bg-[#fff] dark:bg-[#111827] h-[100vh] w-full">
      <div class="px-6 pt-12 pb-8">
        <img
          src="/images/logo/dark/logo-dark.png"
          class="w-[150px] block dark:hidden"
          alt="logo zycoda"
        />
        <img
          src="/images/logo/light/logo-light.png"
          class="w-[150px] hidden dark:block"
          alt="logo zycoda"
        />
        <hr class="border-b border-[var(--black)]/10 mt-[25px]" />
      </div>
      <div class="flex flex-col justify-between h-[80vh]">
        <ul class="px-2">
          <li
            class="px-4 group transition-all duration-150 rounded-xl hover:bg-[#e3e6f6] flex items-center gap-4 h-[45px]"
          >
            <NuxtLink
              to="/"
              class="!text-[#8b92bd] flex items-center gap-4 w-full group-hover:!text-[var(--blue)] group-hover:font-bold transition-all duration-150"
            >
              <vue-feather
                type="layers"
                class="text-[#8b92bd] w-[16px] group-hover:!text-[var(--blue)] group-hover:font-bold transition-all duration-150"
              ></vue-feather>
              <p>บทความ</p>
            </NuxtLink>
          </li>
          <li
            class="px-4 group transition-all duration-150 rounded-xl hover:bg-[#e3e6f6] flex items-center gap-4 h-[45px]"
          >
            <NuxtLink
              to="/user"
              class="!text-[#8b92bd] flex items-center gap-4 w-full group-hover:!text-[var(--blue)] group-hover:font-bold transition-all duration-150"
            >
              <vue-feather
                type="user"
                class="text-[#8b92bd] w-[16px] group-hover:!text-[var(--blue)] group-hover:font-bold transition-all duration-150"
              ></vue-feather>
              <p>ผู้ดูแลระบบ</p>
            </NuxtLink>
          </li>
        </ul>

        <ul class="px-2">
          <li
            class="px-4 group transition-all duration-150 rounded-xl hover:bg-[#e3e6f6] flex items-center gap-4 h-[45px]"
          >
            <NuxtLink
              @click="fn_logout()"
              to="javascript:void(0)"
              class="!text-[#8b92bd] flex items-center gap-4 w-full group-hover:!text-[var(--blue)] group-hover:font-bold transition-all duration-150"
            >
              <vue-feather
                class="text-[#8b92bd] w-[16px] group-hover:!text-[var(--blue)] group-hover:font-bold transition-all duration-150"
              ></vue-feather>
              <p>ออกจากระบบ</p>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="lg:hidden block px-4 pt-4">
    <div class="bg-[#fff] w-full h-[50px] flex rounded-lg items-center px-4 cursor-pointer">
      <vue-feather
        @click="fn_openSidebar()"
        type="menu"
        class="text-[var(--black)] w-[16px]"
      ></vue-feather>
    </div>
  </div>

  <div
    class="fixed hidden w-full h-full bg-black/[0.4] top-[0] left-[9999rem] z-[2] transition-opacity duration-300 opacity-0"
    id="mobile-drawer"
    @click="fn_openSidebar()"
  ></div>
</template>

<script setup>
import VueFeather from "vue-feather";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";

const { logUserOut } = useAuthStore();

const fn_openSidebar = () => {
  const sidebar = document.querySelector(".sidebar");
  const mobileDrawer = document.querySelector("#mobile-drawer");

  mobileDrawer.classList.toggle("!left-0");
  mobileDrawer.classList.toggle("hidden");
  mobileDrawer.classList.toggle("!opacity-100");

  sidebar.classList.toggle("!left-0");
};

const fn_logout = () => {
  logUserOut();
  location.reload()
};
</script>

<style>
.router-link-active.router-link-exact-active {
  @apply !text-[var(--blue)] !font-bold;
}

li:has(> a.router-link-active.router-link-exact-active) {
  @apply bg-[#e3e6f6];
}
</style>
