<template>
  <div class="lg:ml-[300px] p-8 ml-0">
    <div class="bg-[#fff] rounded-xl p-8 dark:bg-[#111827]">
      <div class="flex justify-between items-center">
        <h1 class="text-[35px] font-bold text-[var(--pink)]">
          จัดการผู้ดูแลระบบ
        </h1>
        <button
          @click="fn_openDialogAdd"
          class="text-[#fff] bg-[var(--pink)] hover:bg-[var(--blue)] hover:shadow-none transition-all duration-150 h-[35px] rounded-lg shadow-xl px-4 py-2 flex items-center text-center"
        >
          เพิ่มผู้ดูแลระบบ
        </button>
      </div>

      <div class="mt-[100px]">
        <UTable :rows="rows" :columns="columns" :loading="pending">
          <template #loading-state>
            <div class="flex items-center justify-center h-32">
              <i class="loader --6" />
            </div>
          </template>
          <template #actions-data="{ row }">
            <UDropdown :items="items(row)">
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-ellipsis-horizontal-20-solid"
              />
            </UDropdown>
          </template>
        </UTable>

        <div
          class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
        >
          <UPagination
            v-model="page"
            :page-count="pageCount"
            :total="users.length"
          />
        </div>
      </div>
    </div>

    <DialogAddUser :show="isOpen" :onClose="closeDialog" />
    <DialogEditUser
      :show="isOpenEdit"
      :item="userItemEdit"
      :onClose="closeDialog"
    />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});

import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const env = useRuntimeConfig();

const isOpen = ref(false);
const isOpenEdit = ref(false);
let userItemEdit = "";

const fn_openDialogAdd = () => {
  isOpen.value = true;
};

const fn_openDialogEdit = (item) => {
  userItemEdit = item;
  isOpenEdit.value = true;
};

const closeDialog = () => {
  isOpen.value = false;
  isOpenEdit.value = false;
  fn_users();
};

let pending = ref(true);

const columns = [
  {
    key: "userId",
    label: "ID",
  },
  {
    key: "userName",
    label: "ชื่อผู้ใช้งาน",
  },
  {
    key: "createTime",
    label: "เวลาที่สร้าง/แก้ไข",
  },
  {
    key: "actions",
  },
];
const users = ref([]);
const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => fn_openDialogEdit(row),
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => fn_deleteUser(row),
    },
  ],
];

const page = ref(1);
const pageCount = 5;

const rows = computed(() => {
  return users.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});

const fn_users = async () => {
  try {
    const result = await axios.get(env.public.API_BASE_URL + "/enrol");

    if (result.data.status === "OK") {
      console.log(result.data.message);
      users.value = result.data.message;
    }

    pending.value = false;
  } catch (err) {
    pending.value = false;
    console.log(err, "catch");
    Swal.fire({
      title: "ผิดพลาด!",
      text: "มีข้อผืดพลาดบางอย่างเกิดขึ้น",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
  }
};

const fn_deleteUser = async (item) => {
  Swal.fire({
    title: "ยืนยัน",
    text: "ยืนยันการลบผู้ใช้งานนี้ใช่หรือไม่?",
    icon: "info",
    confirmButtonText: "ยืนยัน",
    showCancelButton: true,
    cancelButtonText: "ยกเลิก",
  }).then(async (result) => {
    if (result.isConfirmed) {
      fn_confirmDelete(item);
    }
  });
};

const fn_confirmDelete = async (item) => {
  try {
    pending.value = true;

    let payload = {
      uuid: item.userId,
    };

    const result = await axios.delete(env.public.API_BASE_URL + "/enrol", {
      data: payload,
    });

    if (result.data.status === "OK") {
      console.log(result.data.message);
      Swal.fire({
        title: "สำเร็จ",
        text: "ลบผู้ใช้งานเรียบร้อย",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then((result) => {
        if (result.isConfirmed) {
          fn_users();
        }
      });
    }

    // pending.value = false;
  } catch (err) {
    pending.value = false;
    console.log(err, "catch");
    Swal.fire({
      title: "ผิดพลาด!",
      text: "มีข้อผืดพลาดบางอย่างเกิดขึ้น",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
  }
};

onMounted(() => {
  fn_users();
});

useHead({
  title: "Zycoda Admin",
  meta: [{ name: "description", content: "Zycoda Admin" }],
});
</script>

<style scoped>
/* https://codepen.io/jenning/pen/YzNmzaV */

.loader {
  --color: rgb(var(--color-primary-400));
  --size-mid: 6vmin;
  --size-dot: 1.5vmin;
  --size-bar: 0.4vmin;
  --size-square: 3vmin;

  display: block;
  position: relative;
  width: 50%;
  display: grid;
  place-items: center;
}

.loader::before,
.loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
}

/**
    loader --6
**/
.loader.--6::before {
  width: var(--size-square);
  height: var(--size-square);
  background-color: var(--color);
  top: calc(50% - var(--size-square));
  left: calc(50% - var(--size-square));
  animation: loader-6 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}

@keyframes loader-6 {
  0%,
  100% {
    transform: none;
  }

  25% {
    transform: translateX(100%);
  }

  50% {
    transform: translateX(100%) translateY(100%);
  }

  75% {
    transform: translateY(100%);
  }
}
</style>
