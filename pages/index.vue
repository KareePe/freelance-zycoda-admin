<template>
  <div class="lg:ml-[300px] p-8 ml-0">
    <div class="bg-[#fff] rounded-xl p-8 dark:bg-[#111827]">
      <div class="flex justify-between items-center">
        <h1 class="text-[35px] font-bold text-[var(--pink)]">จัดการบทความ</h1>

        <button
          @click="fn_openDialogAdd"
          class="text-[#fff] bg-[var(--pink)] hover:bg-[var(--blue)] hover:shadow-none transition-all duration-150 h-[35px] rounded-lg shadow-xl px-4 py-2 flex items-center text-center"
        >
          เพิ่มบทความ
        </button>
      </div>

      <div class="mt-[100px]">
        <UTable :rows="rows" :columns="columns" :loading="pending">
          <template #loading-state>
            <div class="flex items-center justify-center h-32">
              <i class="loader --6" />
            </div>
          </template>
          <template #articleDesc-data="{ row }">
            <div
              v-html="row.articleDesc"
              style="
                width: 250px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
              class="h-[150px]"
            ></div>
          </template>
          <template #articleImg-data="{ row }">
            <img :src="row.articleImg" style="width: 650px !important" alt="" />
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
            :total="blog.length"
          />
        </div>
      </div>
    </div>

    <DialogAddArticle :show="isOpen" :onClose="closeDialog" />
    <DialogEditArticle
      :show="isOpenEdit"
      :item="blogItemEdit"
      :onClose="closeDialog"
    />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});

import { ref } from "vue";
import Swal from "sweetalert2";
import axios from "axios";

const env = useRuntimeConfig();

const isOpen = ref(false);
const isOpenEdit = ref(false);
let blogItemEdit = "";

const fn_openDialogAdd = () => {
  isOpen.value = true;
};

const fn_openDialogEdit = (item) => {
  blogItemEdit = item;
  isOpenEdit.value = true;
};

const closeDialog = () => {
  isOpen.value = false;
  isOpenEdit.value = false;
  fn_blog();
};

let pending = ref(true);

const columns = [
  {
    key: "articleId",
    label: "ID",
  },
  {
    key: "articleTopic",
    label: "หัวข้อบทความ",
  },
  {
    key: "articleDesc",
    label: "รายละเอียด",
  },
  {
    key: "articleImg",
    label: "รูปภาพ",
  },
  {
    key: "articleDate",
    label: "เวลาที่สร้าง/แก้ไข",
  },
  {
    key: "actions",
  },
];
const blog = ref([]);
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
      click: () => fn_deleteBlog(row),
    },
  ],
];

const page = ref(1);
const pageCount = 5;

const rows = computed(() => {
  return blog.value.slice((page.value - 1) * pageCount, page.value * pageCount);
});

const fn_blog = async () => {
  try {
    pending.value = true;

    const result = await axios.get(env.public.API_BASE_URL + "/getBlog");
    console.log(result.data);
    let data = result.data.message.map((article) => ({
      ...article,
      articleImg: "https://raw.thearkcoding.com/uploads/" + article.articleImg,
    }));
    blog.value = data;

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

const fn_deleteBlog = async (item) => {
  Swal.fire({
    title: "ยืนยัน",
    text: "ยืนยันการลบบทความนี้ใช่หรือไม่?",
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
      uuid: item.articleId,
    };

    console.log(payload);

    const result = await axios.delete(env.public.API_BASE_URL + "/blog", {
      data: payload,
    });

    if (result.data.status === "OK") {
      console.log(result.data.message);
      Swal.fire({
        title: "สำเร็จ",
        text: "ลบบทความเรียบร้อย",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then((result) => {
        if (result.isConfirmed) {
          fn_blog();
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
  fn_blog();
});

useHead({
  title: "Zycoda Admin",
  meta: [{ name: "description", content: "Zycoda Admin" }],
});
</script>

<style>
.whitespace-nowrap:nth-child(3) {
  @apply !whitespace-break-spaces;
}
</style>
