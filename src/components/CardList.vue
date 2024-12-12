<template>
  <div class="card-list px-8 grid grid-cols-2 gap-4">
    <!-- Передача обработчиков событий в Cart -->
    <Cart
      :imageUrl="'/sneakers/sneakers-1.jpg'"
      :isAdded="isAdded"
      :isFavorite="isFavorite"
      :title="'Мужские Кроссовки Nike Blazer Mid Suede'"
      :price="'12 999 uah.'"
      @clickIsFavorite="handleClickIsFavorite"
      @clickIsAdded="handleClickIsAdded"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

// Локальное состояние для отслеживания
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
