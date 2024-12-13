<template>
  <div class="card-list px-8 grid grid-cols-2 gap-4">
    <Cart
      v-for="item in items"
      :id="item.id"
      :key="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price.toString()"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
      @toggleFavorite="toggleFavorite(item.id)"
      @addToCart="(id) =>  $emit('addToCart', id)"
     />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import Cart from "./Cart.vue";

const props = defineProps({
  items: Array,
});

const favorites = ref([]); // Храним список избранных ID

// Загрузка избранного из localStorage
const loadFavoritesFromStorage = () => {
  console.log("Loading favorites from localStorage...");
  favorites.value = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.value = [...new Set(favorites.value)]; // Убираем дубликаты
  console.log("Loaded favorites:", favorites.value);

  // Устанавливаем флаг isFavorite для каждого элемента
  props.items.forEach((item) => {
    item.isFavorite = favorites.value.includes(item.id);
    console.log(`Item ${item.id} (${item.title}) isFavorite set to:`, item.isFavorite);
  });
};

// Сохраняем избранное в localStorage
const saveFavoritesToStorage = () => {
  localStorage.setItem("favorites", JSON.stringify(favorites.value));
};

// Тогглинг избранного для конкретного элемента
const toggleFavorite = (id) => {
  console.log(`Toggle favorite called for ID: ${id}`);
  const item = props.items.find((item) => item.id === id);

  if (item) {
    console.log(`Found item for ID ${id}:`, item);
    item.isFavorite = !item.isFavorite;

    if (item.isFavorite) {
      if (!favorites.value.includes(id)) {
        favorites.value.push(id); // Добавляем в избранное
      }
    } else {
      favorites.value = favorites.value.filter((favId) => favId !== id); // Удаляем из избранного
    }

    favorites.value = [...new Set(favorites.value)]; // Убираем дубликаты
    saveFavoritesToStorage(); // Сохраняем изменения
    console.log("Updated favorites:", favorites.value);
  } else {
    console.error(`Item with ID ${id} not found.`);
  }
};

// Следим за изменением items (вдруг список обновится)
watch(
  () => props.items,
  (newItems) => {
    console.log("Items updated:", newItems);
    loadFavoritesFromStorage();
  },
  { immediate: true }
);

const emit = defineEmits(["addToCart"]);

// Загружаем избранное при инициализации
onMounted(() => {
  console.log("onMounted: Initializing...");
  loadFavoritesFromStorage();
});
</script>

<style scoped>
/* Ваши стили */
</style>
