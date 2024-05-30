<template>
  <div
    class="bg-[url(/images/bg-auth.png)] bg-cover bg-left-top p-[25px] w-full h-[100vh] flex justify-center items-center bg-[var(--white)] dark:bg-[var(--black)]"
  >
    <div
      class="bg-[#fff] dark:bg-slate-800 rounded-2xl shadow-xl p-[25px] max-w-[450px] w-full grid gap-2"
    >
      <img
        src="/images/logo/dark/logo-dark.png"
        class="w-[150px] dark:hidden"
        alt=""
      />
      <p class="text-[var(--black)] font-bold text-[35px] dark:text-[#fff]">
        Sign in
      </p>

      <div class="w-full">
        <Vueform
          v-model="data"
          ref="form$"
          :display-errors="false"
          :endpoint="false"
          @submit="fn_auth"
          sync
        >
          <GroupElement name="group1">
            <TextElement
              name="username"
              :label="Username"
              placeholder="enter your username"
              :rules="['required']"
              :columns="{
                default: 12,
                sm: 12,
                md: 12,
                lg: 12,
              }"
              :readonly="loading"
            />

            <TextElement
              name="password"
              input-type="password"
              :label="Username"
              placeholder="enter your password"
              :rules="['required']"
              :columns="{
                default: 12,
                sm: 12,
                md: 12,
                lg: 12,
              }"
              :readonly="loading"
            />
          </GroupElement>

          <p
            v-if="status_auth === true"
            class="text-[14px] text-red-600 col-span-12"
          >
            Please try again. Your username or password is incorrect.
          </p>

          <ButtonElement
            name="button"
            submits
            button-class="w-full !bg-[var(--blue)] !border-0 hover:!bg-[var(--pink)] !transition-all !duration-300 hover:!skew-x-0 hover:!skew-y-0"
            :loading="loading"
          >
            Sign in
          </ButtonElement>
        </Vueform>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
});

import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";

const { authenticateUser } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());

const router = useRouter();

const form$ = ref(null);
const data = ref({
  username: "admin",
  password: "admin@1234",
});

let loading = ref(false);
let status_auth = ref(false);

const fn_auth = async () => {

  loading.value = true;

  const payload = {
    username: form$.value.data.username,
    password: form$.value.data.password,
  };

  await authenticateUser(payload);

  console.log(authenticated.value)

  if (authenticated.value === true) {
    router.push("/");
  } else {
    status_auth.value = true;
    loading.value = false
  }
  
};

// onMounted(() => {
//   const token = useCookie("token");

//   if (token.value) {
//     // check if value exists
//     authenticated.value = true; // update the state to authenticated
//   }
// })
</script>

<style></style>
