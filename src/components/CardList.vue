<template>
  <div class="card-list px-8 grid grid-cols-2 gap-4">
    <Cart
      v-for="item in items"
      :key="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price.toString()" 
      :isAdded="isAdded"
      :isFavorite="isFavorite"
      :clickIsFavorite="handleClickIsFavorite"
      :clickIsAdded="handleClickIsAdded"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Cart from "./Cart.vue";

const props = defineProps({
  items: Array
});

// Локальное состояние
const isAdded = ref(false);
const isFavorite = ref(false);

// Обработчики событий
const handleClickIsFavorite = () => {
  isFavorite.value = !isFavorite.value;
  console.log("Избранное:", isFavorite.value);
};

const handleClickIsAdded = () => {
  isAdded.value = !isAdded.value;
  console.log("Добавлено в корзину:", isAdded.value);
};
</script>

<style lang="scss" scoped>

</style>
