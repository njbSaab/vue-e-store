<template>
    <header class="flex justify-between border-b broder-slate-300 px-8 py-4">
      <div class="logo-wrapper flex gap-3 items-center">
        <img src="/logo.png" alt="">
        <div class="wrapper-content">
          <h2 class="text-xl uppercase font-bold">Vue e-store</h2>
          <p class="text-slate-400">shop great products</p>
        </div>
      </div>
      <nav class="flex items-center">
        <ul class="flex items-center gap-4">
          <li
          @click="() => { console.log('Click detected in Header'); $emit('open-drawer'); }"
          id="openDrawer" class="flex items-center gap-2 text-gray-500 hover:text-black transition-all cursor-pointer">
            <img src="/cart.svg" alt="">
              <span>{{ cartTotal.toFixed(2) }} uah</span>
          </li>
          <li class="flex items-center gap-2 text-gray-500 hover:text-black transition-all cursor-pointer">
            <img src="/heart.svg" alt="">
            <span>Закладки</span>
          </li>
          <li class="flex items-center gap-2 text-gray-500 hover:text-black transition-all cursor-pointer">
            <img src="/profile.svg" alt="">
            <span>Личный кабинет</span>
          </li>
        </ul>
      </nav>
    </header>
</template>

<script setup>
const emit = defineEmits(["open-drawer"]); // Определение событий

const props = defineProps({
  cartTotal: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
</style>
