<script setup>
import CartBasket from "./CartBasket.vue";

const props = defineProps({
  cartItems: Array, // Товары в корзине
});

const emit = defineEmits(["updateCart"]); // Для передачи обновленного массива

const handleRemoveItem = (id) => {
  const updatedCart = props.cartItems.filter((item) => item.id !== id);
  emit("updateCart", updatedCart); // Передаем обновленный массив
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <CartBasket
      v-for="item in cartItems"
      :key="item.id"
      :id="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      @removeItem="handleRemoveItem"
    />
  </div>
</template>
