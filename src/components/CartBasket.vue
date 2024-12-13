<script setup>
const props = defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: [String, Number],
});

const emit = defineEmits(["removeItem"]); // Событие для удаления элемента
</script>

<template>
  <div class="border rounded-xl border-slate-400 p-4 relative">
    <img class="w-[175px] mx-auto" :src="imageUrl" alt="">
    <!-- Кнопка удаления -->
    <img
      @click="$emit('removeItem', id)" 
      class="absolute top-2 right-2 cursor-pointer hover:scale-110 transition-all"
      src="/close.svg"
      alt="Удалить"
    />
    <div class="flex flex-col justify-between gap-4">
      <p class="text-xl text-center">{{ title }}</p>
      <p class="text-black text-1xl font-bold text-center">{{ price }} uah</p>
    </div>
  </div>
</template>
