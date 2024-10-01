<template>
  <div class="lg:ml-[300px] lg:p-8 p-4 ml-0">
    <div class="grid lg:grid-cols-6 grid-cols-1 gap-4">
      <div
        class="bg-[#fff] lg:col-span-2 col-span-1 rounded-xl p-8 dark:bg-[#111827] mb-4 h-[fit-content]"
      >
        <div class="flex justify-between items-center">
          <h1 class="text-[16px] font-bold text-[var(--pink)]">
            จัดการกิจกรรมที่ผ่านมา
          </h1>
        </div>

        <Vueform
          class="my-4"
          v-model="activities"
          ref="form$"
          :display-errors="false"
          :endpoint="false"
          @submit="fn_addActivities"
          sync
        >
          <TextElement
            name="name"
            label="ชื่อกิจกรรม"
            autocomplete="off"
            placeholder="กรอกชื่อกิจกรรม"
            :rules="['required']"
            :columns="{
              default: 12,
              sm: 12,
              md: 12,
              lg: 12,
            }"
            :readonly="loading"
          />

          <ButtonElement
            name="button"
            submits
            button-class="w-full !bg-[var(--blue)] !border-0 hover:!bg-[var(--pink)] !transition-all !duration-300 hover:!skew-x-0 hover:!skew-y-0"
            :loading="loading"
            :disabled="activities.name === ''"
          >
            เพิ่มข้อมูล
          </ButtonElement>
        </Vueform>

        <div>
          <p class="font-bold text-[18px] mb-[15px]">หัวข้อกิจกรรม</p>
          <Vueform v-if="loading === false">
            <GroupElement
              v-for="(item, index) in activitiesList"
              :key="index"
              :name="index"
            >
              <TextElement
                name="text"
                autocomplete="off"
                placeholder="กรอกชื่อกิจกรรม"
                :default="item.activities_name"
                :readonly="loading"
                :columns="{
                  default: 8,
                }"
              />
              <ButtonElement
                @click="
                  fn_updateActivities(item.activities_id, item.activities_name)
                "
                name="button"
                button-class="w-full !bg-[var(--blue)] !border-0 hover:!bg-[var(--pink)] !transition-all !duration-300 hover:!skew-x-0 hover:!skew-y-0"
                :loading="loading"
                :columns="{
                  default: 4,
                }"
              >
                แก้ไข
              </ButtonElement>
            </GroupElement>
          </Vueform>
        </div>
      </div>
      <div
        class="bg-[#fff] lg:col-span-4 col-span-1 rounded-xl p-8 dark:bg-[#111827] mb-4"
      >
        <div class="w-full h-[150px] rounded-xl mb-4 bg-[#e5e5e5] relative">
          <!-- <img
            v-if="previewURL !== null"
            class="preview-img w-full h-full object-cover rounded-lg mb-4"
            :src="previewURL"
            alt=""
          /> -->
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
            คลิกที่นี้เพื่อเลือกรูปภาพ
          </button>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <div
            class="w-full relative"
            v-for="(img, index) in previewURL"
            :key="index"
          >
            <button
              type="button"
              @click="fn_popImg(index)"
              class="px-2 py-1 rounded-md bg-[var(--pink)] shadow-xl absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]"
            >
              <vue-feather
                type="trash-2"
                class="text-[#fff] cursor-pointer"
              ></vue-feather>
            </button>

            <img
              v-if="previewURL.length > 0"
              class="preview-img w-full h-full object-cover mb-4"
              :src="img"
              alt=""
            />
          </div>
        </div>

        <Vueform
          class="my-4"
          v-model="activitiesSelect"
          ref="form$create"
          :display-errors="false"
          :endpoint="false"
          @submit="uploadImg"
          sync
        >
          <SelectElement
            :native="false"
            :items="activitiesItem"
            label="ชื่อกิจกรรม"
            placeholder="เลือกชื่อกิจกรรม"
            name="name"
            :rules="['required']"
            :columns="{
              default: 12,
              sm: 12,
              md: 12,
              lg: 12,
            }"
            :readonly="loading"
          />

          <ButtonElement
            name="button"
            submits
            button-class="w-full !bg-[var(--blue)] !border-0 hover:!bg-[var(--pink)] !transition-all !duration-300 hover:!skew-x-0 hover:!skew-y-0"
            :loading="loading"
            :disabled="
              activitiesSelect.name === '' || selectedImage.length === 0
            "
          >
            เพิ่มรูปกิจกรรม
          </ButtonElement>
        </Vueform>

        <div class="grid grid-cols-3 gap-4">
          <div
            class="w-full relative"
            v-for="(img, index) in imgList"
            :key="index"
          >
            <div
              class="left-[5px] top-[5px] absolute bg-[var(--blue)] px-2 py-1 rounded-md"
            >
              <p class="text-[#fff] text-[14px]">
                {{ img.activities_name }}
              </p>
            </div>
            <button
              type="button"
              @click="fn_deleteImg(img.id)"
              class="px-2 py-1 rounded-md bg-[var(--pink)] shadow-xl absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]"
            >
              <vue-feather
                type="trash-2"
                class="text-[#fff] cursor-pointer"
              ></vue-feather>
            </button>

            <img
              class="preview-img w-full h-full object-cover mb-4"
              :src="`https://raw.thearkcoding.com/uploads/${img.imgName}`"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  onClose: Function,
});

import { ref } from "vue";
import VueFeather from "vue-feather";
import axios from "axios";
import Swal from "sweetalert2";

const env = useRuntimeConfig();
const form$ = ref(null);
const form$update = ref(null);
const form$create = ref(null);
const activities = ref({
  name: "",
});
const loading = ref(true);
const activitiesList = ref([]);
const activitiesItem = ref([]);
const activitiesSelect = ref({
  name: "",
});

const fn_addActivities = async () => {
  try {
    loading.value = true;

    let name = form$.value.data.name;

    let payload = {
      name: name,
    };

    const result = await axios.post(
      env.public.API_BASE_URL + "/activities",
      payload
    );

    if (result.data.status === "OK") {
      Swal.fire({
        title: "สำเร็จ",
        text: "เพิ่มชื่อกิจกรรมเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then((result) => {
        if (result.isConfirmed) {
          activities.value.name = "";
          form$.value.reset();
          activitiesItem.value = []
          fn_getActivities();
        }
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

const fn_getActivities = async () => {
  try {
    loading.value = true;

    const result = await axios.get(env.public.API_BASE_URL + "/activities");

    if (result.data.status === "OK") {
      activitiesList.value = result.data.message;

      result.data.message.map((item) => {
        activitiesItem.value.push({
          value: item.activities_id,
          label: item.activities_name,
        });
      });

      console.log(activitiesItem.value);
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

const fn_updateActivities = async (id, name) => {
  try {
    loading.value = true;

    let payload = {
      id: id,
      name: name,
    };

    const result = await axios.put(
      env.public.API_BASE_URL + "/activities",
      payload
    );

    if (result.data.status === "OK") {
      activitiesItem.value = []
      fn_getActivities();
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

let previewURL = ref([]);
let selectedImage = ref([]);
let base64String = ref("");
const file = ref(null);
const imgList = ref([]);

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
            selectedImage.value = [];
            base64String.value = "";
            previewURL.value = [];
          }
        });
      } else {
        console.log("Image size is within the limit. Proceed with upload.");
        const reader = new FileReader();

        reader.onload = () => {
          selectedImage.value.push(file);
          base64String.value = reader.result.split(",")[1];
          previewURL.value.push(reader.result);

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

const fn_popImg = (index) => {
  previewURL.value.splice(index, 1);
  selectedImage.value.splice(index, 1);
  console.log(previewURL.value);
  console.log(selectedImage.value);
};

const uploadImg = async () => {
  try {
    loading.value = true;

    selectedImage.value.map(async (item) => {
      const formData = new FormData();
      formData.append("image", item);

      let result = await axios.post(
        "https://raw.thearkcoding.com/upload.php",
        formData
      );

      if (result.data.status === "success") {
        fn_addActivitiesImg(result.data.data.file_name);
      }
    });

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
  //   console.log(selectedImage.value);
};

const fn_addActivitiesImg = async (img) => {
  try {
    loading.value = true;

    let payload = {
      name: img,
      id: activitiesSelect.value.name,
    };

    const result = await axios.post(
      env.public.API_BASE_URL + "/activities-img",
      payload
    );

    if (result.data.status === "OK") {
      fn_getImg();
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

const fn_getImg = async () => {
  try {
    loading.value = true;

    selectedImage.value = [];
    base64String.value = "";
    previewURL.value = [];

    const result = await axios.get(env.public.API_BASE_URL + "/activities-img");

    if (result.data.status === "OK") {
      imgList.value = result.data.message;

      console.log(imgList.value);
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

const fn_deleteImg = async (id) => {
  Swal.fire({
    title: "ยืนยัน",
    text: "ยืนยันการลบรูปกิจกรรมนี้ใช่หรือไม่?",
    icon: "info",
    confirmButtonText: "ยืนยัน",
    showCancelButton: true,
    cancelButtonText: "ยกเลิก",
  }).then(async (result) => {
    if (result.isConfirmed) {
      fn_confirmDelete(id);
    }
  });
};

const fn_confirmDelete = async (id) => {
  try {
    loading.value = true;

    let payload = {
      id: id,
    };

    const result = await axios.delete(
      env.public.API_BASE_URL + "/activities-img",
      {
        data: payload,
      }
    );

    if (result.data.status === "OK") {
      console.log(result.data.message);
      Swal.fire({
        title: "สำเร็จ",
        text: "ลบรูปกิจกรรมเรียบร้อย",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then((result) => {
        if (result.isConfirmed) {
          fn_getImg();
        }
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
onMounted(() => {
  fn_getActivities();
  fn_getImg();
});
</script>

<style></style>
