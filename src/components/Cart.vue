<template>
  <div class="cart flex flex-col relative rounded-3xl border border-salate-100 p-4 cursor-pointer hover:translate-y-1 hover:shadow-xl transition-all bg-white">
    <!-- Избранное -->
    <img
      @click="$emit('toggleFavorite')"
      :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
      alt="Favorite"
      class="absolute top-2 left-2 w-[30px] cursor-pointer"
    />
    <!-- Основное изображение -->
    <img :src="imageUrl" class="mx-w-full" alt="Product" />
    <p>{{ title }}</p>

    <!-- Цена и кнопка добавления -->
    <div class="cart-text-content flex justify-between mt-4">
      <div class="price flex flex-col">
        <span class="text-slate-400">Цена: </span>
        <b>{{ price }}</b>
      </div>
      <!-- Добавить в корзину -->
      <img
        @click="clickIsAdded"
        :src="isAdded ? '/checked.svg' : '/plus.svg'"
        alt="Add to Cart"
        class="cursor-pointer"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  imageUrl: String,
  title: String,
  price: [String, Number],
  isFavorite: Boolean,
  isAdded: Boolean,
  clickIsAdded: Function,
  clickIsFavorite: Function,
});

// Явный вызов переданных функций из props
const clickIsFavorite = () => {
  if (typeof props.clickIsFavorite === "function") {
    props.clickIsFavorite();
  } else {
    console.error("clickIsFavorite is not a function");
  }
};

const clickIsAdded = () => {
  if (typeof props.clickIsAdded === "function") {
    props.clickIsAdded();
  } else {
    console.error("clickIsAdded is not a function");
  }
};
</script>

<style scoped>
/* Ваши стили */
</style>
