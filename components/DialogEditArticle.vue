<template>
  <UModal v-model="props.show" :fullscreen="full">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <div class="flex gap-2 items-center">
            <div
              class="bg-red-500 w-[16px] h-[16px] flex items-center justify-center rounded-full"
            >
              <vue-feather
                @click="closeDialog()"
                type="x"
                class="text-red-800 w-[12px] font-bold cursor-pointer"
              ></vue-feather>
            </div>
            <div
              class="bg-lime-500 w-[16px] h-[16px] flex items-center justify-center rounded-full"
            >
              <vue-feather
                @click="full === false ? (full = true) : (full = false)"
                :type="full === false ? 'maximize-2' : 'minimize-2'"
                class="text-lime-800 w-[10px] font-bold cursor-pointer"
              ></vue-feather>
            </div>
          </div>
          <p class="text-[20px] font-bold">เพิ่มบทความ</p>
        </div>
      </template>

      <div class="w-full h-[250px] rounded-xl mb-4 bg-[#e5e5e5] relative">
        <img
          v-if="previewURL !== null"
          class="preview-img w-full h-full object-cover rounded-lg mb-4"
          :src="previewURL"
          alt=""
        />
        <img
          v-if="previewURL === null"
          class="preview-img w-full h-full object-cover rounded-lg mb-4"
          :src="props.item.articleImg"
          alt=""
        />
        <input
          type="file"
          accept="image/*"
          id="imageCover"
          @change="previewImage"
          alt=""
          class="hidden"
        />

        <button
          @click="fn_selectImg()"
          class="w-[fit-content] position-btn h-[50px] rounded-lg bg-[var(--pink)] text-[#fff] px-4 py-2"
        >
          อัพโหลดรูปภาพ
        </button>
      </div>

      <Vueform
        v-model="data"
        ref="form$"
        :display-errors="false"
        :endpoint="false"
        @submit="uploadImg"
        sync
      >
        <GroupElement name="group1">
          <TextElement
            name="topic"
            :label="Topic"
            autocomplete="off"
            placeholder="enter topic"
            :rules="['required']"
            :columns="{
              default: 12,
              sm: 12,
              md: 12,
              lg: 12,
            }"
            :readonly="loading"
          />

          <EditorElement
            name="editor"
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

        <ButtonElement
          name="button"
          submits
          button-class="w-full !bg-[var(--blue)] !border-0 hover:!bg-[var(--pink)] !transition-all !duration-300 hover:!skew-x-0 hover:!skew-y-0"
          :loading="loading"
        >
          เพิ่มข้อมูล
        </ButtonElement>
      </Vueform>
      <!-- {{ props.item }} -->
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

import { ref, onMounted } from "vue";
import VueFeather from "vue-feather";
import md5 from "md5";
import axios from "axios";
import Swal from "sweetalert2";

const env = useRuntimeConfig();

let full = ref(false);

let previewURL = ref(null);
let selectedImage = ref(null);
let base64String = ref("");
const file = ref(null);

const form$ = ref(null);
const data = ref({
  topic: "",
  editor: "",
});

let loading = ref(false);

const closeDialog = () => {
  selectedImage.value = null;
  base64String.value = "";
  previewURL.value = null;
  data.value.topic = "";
  data.value.editor = "";
  props.onClose();
};

const fn_selectImg = () => {
  document.getElementById("imageCover").click();
};

const previewImage = (event) => {
  const file = event.target.files[0];
  //   console.log(file);

  if (file) {
    const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to megabytes
    const maxSizeInMB = 1;
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      if (fileSizeInMB > maxSizeInMB) {
        Swal.fire({
          title: "ขนาดไฟล์รูปภาพใหญ่เกินไป",
          text: "ขนาดรูปภาพเกินขีดจำกัดสูงสุด 1MB โปรดเลือกรูปภาพที่เล็กลง",
          icon: "warning",
          confirmButtonText: "ตกลง",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            // loading.value = false;
            selectedImage.value = null;
            base64String.value = "";
            previewURL.value = null;
          }
        });
      } else {
        console.log("Image size is within the limit. Proceed with upload.");
        const reader = new FileReader();

        reader.onload = () => {
          selectedImage.value = file;
          base64String.value = reader.result.split(",")[1];
          previewURL.value = reader.result;

          //   uploadImg(selectedImage.value);
          // blogData.value.img = base64String.value;
        };

        if (file) {
          reader.readAsDataURL(file);
        }
      }
    } else {
      Swal.fire({
        title: "นามสกุลไฟล์ไม่ถูกต้อง",
        text: "รองรับไฟล์สกุล jpg, jpeg, png เท่านั้น",
        icon: "warning",
        confirmButtonText: "ตกลง",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          // loading.value = false;
        }
      });
    }
  }
};

const uploadImg = async () => {
  console.log(selectedImage.value);
  if (selectedImage.value !== null) {
    try {
      loading.value = true;
      const formData = new FormData();
      formData.append("image", selectedImage.value);
      const result = await axios.post(
        "https://raw.thearkcoding.com/upload.php",
        formData
      );
      if (result.data.status === "success") {
        fn_addBlog(result.data.data.file_name);
        //   console.log(result.data.data.file_name);
      } else {
        Swal.fire({
          title: "ผิดพลาด!",
          text: "อัพโหลดรูปไม่สำเร็จ",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
      // loading.value = false;
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
  } else {
    fn_addBlog();
  }
};

const fn_addBlog = async (img) => {
  try {
    loading.value = true;

    let payload = {
      uuid: props.item.articleId,
      articleTopic: form$.value.data.topic,
      articleDesc: form$.value.data.editor,
      articleImg: img || "",
    };

    console.log(payload, "payload");

    const result = await axios.put(env.public.API_BASE_URL + "/blog", payload);

    if (result.data.status === "OK") {
      Swal.fire({
        title: "สำเร็จ",
        text: "แก้ไขบทความเรียบร้อย",
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
        text: result.data.message.code,
        icon: "error",
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
      data.value.topic = props.item.articleTopic;
      data.value.editor = props.item.articleDesc;
    }
  }
);
</script>

<style>
.position-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
