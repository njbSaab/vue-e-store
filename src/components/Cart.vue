<template>
  <div class="cart flex flex-col relative rounded-3xl border border-salate-100 p-4 cursor-pointer hover:translate-y-1 hover:shadow-xl transition-all bg-white">
      <img @click="clickIsFavorite" :src="isFavorite ? '/like-2.svg' : '/like-1.svg'" alt="" class="absolute top-2 left-2 w-[30px]">
      <img :src="imageUrl" class="mx-w-full" alt="">
      <p>{{ title }}</p>

      <div class="cart-text-content flex justify-between mt-4">
        <div class="price flex flex-col">
          <span class="text-slate-400">Цена: </span>
          <b>{{ price }}</b>
        </div>

        <img @click="clickIsAdded" :src="isAdded ? '/checked.svg ' : '/plus.svg' " alt="">
      </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    imageUrl: String,
    iconUrl: String,
    title: String,
    price: String,
    btnUrl: String,
    isFavorite: Boolean,
    isAdded: Boolean,
    clickIsAdded: Function,
    clickIsFavorite: Function
  })
</script>

<style lang="scss" scoped>

</style>
