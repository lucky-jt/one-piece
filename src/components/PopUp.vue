<template>
  <div class="pop-up" v-if="friendsInformation">
    <div class="left">
      <span
        :class="{ active: index === aIndex }"
        v-for="(item, index) in popupArr"
        :key="index"
        >{{ item.name }}</span
      >
    </div>
    <div class="right">
      <div class="id">弹窗id:{{ friendsInformation.id }}</div>
      <div class="name">弹窗name:{{ friendsInformation.name }}</div>
      <div class="age">弹窗age:{{ friendsInformation.age }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Friend {
  id: number;
  name: string;
  age: number;
}

interface Props {
  detailArr: Friend[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "changDetailArr"): void;
  (e: "setBFn", data: Friend): void;
}>();

let aTime: NodeJS.Timeout | null = null;
let aIndex = 0;

const popupArr = ref<Friend[]>([
  {
    id: 1,
    name: "hhh",
    age: 18,
  },
  {
    id: 2,
    name: "xxx",
    age: 18,
  },
]);

const friendsInformation = ref<Friend | null>(null);

watch(
  () => props.detailArr,
  (newValue) => {
    if (newValue) {
      popupArr.value = newValue;
      friendsInformation.value = popupArr.value[0];
      setAfn();
      emit("setBFn", friendsInformation.value);
    }
  },
  {
    deep: true,
    immediate: true,
  }
);

function clearATime(): void {
  if (aTime) {
    clearTimeout(aTime);
    aTime = null;
  }
}

function setAfn(): void {
  clearATime();
  aTime = setTimeout(() => {
    if (aIndex >= popupArr.value.length - 1) {
      clearATime();
      aIndex = 0;
      emit("changDetailArr");
    } else {
      aIndex++;
      friendsInformation.value = popupArr.value[aIndex];
      setAfn();
      emit("setBFn", friendsInformation.value);
    }
  }, 1000);
}
</script>

<style lang="less" scoped>
.pop-up {
  display: flex;
  width: 300px;
  height: 240px;
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  box-sizing: border-box;
  .left {
    display: flex;
    flex-direction: column;
    width: 100px;
    span {
      margin-bottom: 10px;
    }
    .active {
      color: blue;
    }
  }
  .right {
    flex: 1;
    border-left: 1px solid #000;
    padding: 0 10px;
  }
}
</style>
