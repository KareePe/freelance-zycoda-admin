<template>
  <UModal v-model="props.show">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <p class="text-[20px] font-bold">เพิ่มผู้ดูแลระบบ</p>
          <vue-feather
            @click="closeDialog()"
            type="x"
            class="text-[var(--black)] w-[16px] cursor-pointer"
          ></vue-feather>
        </div>
      </template>
<!-- {{ props.item }} -->
      <Vueform
        v-model="data"
        ref="form$"
        :display-errors="false"
        :endpoint="false"
        @submit="fn_editUser"
        sync
      >
        <GroupElement name="group1">
          <TextElement
            name="username"
            :label="Username"
            autocomplete="off"
            placeholder="enter username"
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
            :label="Username"
            autocomplete="off"
            placeholder="enter password"
            :rules="['required', 'min:6']"
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
          เพิ่มข้อมูล
        </ButtonElement>
      </Vueform>

      <template #footer>
        <Placeholder class="h-8" />
      </template>
    </UCard>
  </UModal>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  item: String,
  onClose: Function,
});

import { ref, onMounted,watch } from "vue";
import VueFeather from "vue-feather";
import md5 from "md5";
import axios from "axios";
import Swal from "sweetalert2";

const env = useRuntimeConfig();
const form$ = ref(null);
const data = ref({
  username: "",
  password: "",
});

let loading = ref(false);

const closeDialog = () => {
  data.value.username = "";
  data.value.password = "";
  props.onClose();
};

const fn_editUser = async () => {
  try {
    loading.value = true;

    let username = form$.value.data.username;
    // let password = md5();
    let password = form$.value.data.password;

    let payload = {
      uuid: props.item.userId,
      username: username,
      password: password,
    };

    console.log(payload)

    const result = await axios.put(
      env.public.API_BASE_URL + "/enrol",
      payload
    );

    if (result.data.status === "OK") {
      Swal.fire({
        title: "สำเร็จ",
        text: "แก้ไขข้อมูลผู้ใช้งานเรียบร้อย",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then((result) => {
        if (result.isConfirmed) {
          closeDialog();
        }
      });
    } else {
      Swal.fire({
        title: "ผิดพลาด",
        text: "แก้ไขข้อมูลไม่สำเร็จ",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
    }

    loading.value = false;
  } catch (err) {
    loading.value = false;
    console.log(err, "catch");
    Swal.fire({
      title: "ผิดพลาด!",
      text: "มีข้อผืดพลาดบางอย่างเกิดขึ้น",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
  }
};

watch(
  () => props.show,
  (val) => {
    if (val) {
      data.value.username = props.item.userName
    }
  }
);
</script>

<style></style>
