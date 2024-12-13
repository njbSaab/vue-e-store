<script setup>
import { computed } from "vue";
import { inject } from "vue";

// Получаем объект через inject
const cartActions = inject("CartActions");

if (!cartActions) {
  console.error("CartActions not provided.");
}

// Извлекаем функцию closeDrawer
const { closeDrawer } = cartActions || {};

// Пропс cartItems
const props = defineProps({
  cartItems: {
    type: Array,
    required: true,
  },
});

// Подсчет количества элементов
const itemCount = computed(() => props.cartItems.length);
</script>

<template>
  <div class="title-wrapper flex items-center gap-2 py-4">
    <span
      @click="closeDrawer"
      class="cursor-pointer p-2 rounded bg-slate-200 h-fit transition-all hover:scale-110 hover:bg-slate-300"
    >
      <img class="rotate-180" src="/arrow-next.svg" alt="">
    </span>
    <h1 class="text-3xl font-bold flex-1">Корзина</h1>
    <p class="count-items">{{ itemCount }} товаров</p>
  </div>
</template>

<style lang="scss" scoped>
/* Ваши стили */
</style>
