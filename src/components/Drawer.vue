<script setup>
import DrawerHeader from "./DrawerHeader.vue";
import CartBasketList from "./CartBasketList.vue";
import DrawerFooter from "./DrawerFooter.vue";

const props = defineProps({
  cartItems: Array, // Список товаров
});

const emit = defineEmits(["updateCartItems"]); // Событие для передачи обновлений

const handleUpdateCart = (updatedCart) => {
  emit("updateCartItems", updatedCart); // Передаем обновленный массив в родительский компонент
};
</script>

<template>
  <div class="fixed w-full h-full top-0 left-0 bg-black z-10 opacity-75" v-auto-animate>
  </div>
  <div class="fixed w-[350px] h-full top-0 right-0 bg-white z-20 px-2" v-auto-animate>
    <DrawerHeader :cartItems="cartItems" />
    <CartBasketList :cartItems="cartItems" @updateCart="handleUpdateCart" />
    <DrawerFooter :cartItems="cartItems" />
  </div>
</template>
