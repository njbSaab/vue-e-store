<script setup>
import { computed } from "vue";

// Пропс cartItems
const props = defineProps({
  cartItems: {
    type: Array,
    required: true,
  },
});

// Подсчет общей суммы
const totalPrice = computed(() =>
  props.cartItems.reduce((sum, item) => sum + (item.price || 0), 0)
);
</script>

<template>
  <div class="flex flex-col gap-4 bg-white pt-6">
    <div class="flex justify-between">
      <span class="text-2xl font-bold">Итого:</span>
      <div class="flex-1 border-b-slate-400"></div>
      <span class="text-2xl font-bold">{{ totalPrice.toFixed(2) }} uah</span>
    </div>
    <button class="bg-lime-500 font-bold text-white py-2 px-4 rounded-lg hover:bg-slate-600 transition-all">
      Оформить заказ
    </button>
  </div>
</template>

<style lang="scss" scoped>
/* Ваши стили */
</style>
