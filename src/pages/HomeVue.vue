<script setup>
import { onMounted, watch, ref, provide, computed } from "vue";
import axios from "axios";

const items = ref([]); // Полный список элементов
const filteredItems = ref([]); // Отфильтрованный список
const favorites = ref([]); // Список избранных ID
const isFilteringFavorites = ref(false); // Состояние фильтрации по избранному
const sortBy = ref(""); // Сортировка
const arrayAddedToCart = ref([]);
const isAddedToCart = ref(false);
const searchQuery = ref(""); // Поиск
const drawerOpen = ref(false); // Состояние бокового меню

// Функция загрузки продуктов
const fetchProducts = async () => {
  try {
    const { data } = await axios.get("https://dummyjson.com/products?limit=20");
    items.value = data.products.map((item, index) => ({
      ...item,
      imageUrl: itemsImg[index % itemsImg.length]?.imageUrl || "",
      isFavorite: favorites.value.includes(item.id), // Устанавливаем isFavorite на основе localStorage
    }));
    applyFilters(); // Применяем фильтры после загрузки
    console.log("Продукты:", items.value);
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
};

// Загрузка избранного из localStorage
const loadFavoritesFromStorage = () => {
  favorites.value = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.value = [...new Set(favorites.value)]; // Убираем дубликаты
  console.log("Загруженные избранные:", favorites.value);
};

// Сохранение избранного в localStorage
const saveFavoritesToStorage = () => {
  localStorage.setItem("favorites", JSON.stringify(favorites.value));
};
const saveAddedToStorage = () => {
  localStorage.setItem("addedToCart", JSON.stringify(arrayAddedToCart.value));
}
// Тогглинг состояния избранного
const toggleFavorite = (id) => {
  const item = items.value.find((item) => item.id === id);
  if (item) {
    item.isFavorite = !item.isFavorite;
    if (item.isFavorite) {
      favorites.value.push(id);
    } else {
      favorites.value = favorites.value.filter((favId) => favId !== id);
    }
    saveFavoritesToStorage();
    console.log(`Товар ${id} теперь избранный:`, item.isFavorite);
    applyFilters(); // Перефильтруем элементы после изменения
  }
};

const addToCart = (id) => {
  const item = items.value.find((item) => item.id === id);
  if (item) {
    item.isAdded = !item.isAdded;
    if (item.isAdded) {
      arrayAddedToCart.value.push(id);
    } else {
      arrayAddedToCart.value = arrayAddedToCart.value.filter((cartId) => cartId !== id);
    }
    saveAddedToStorage();
  }
};
const updateCartItems = (updatedCart) => {
  // Вместо прямой попытки обновить computed, обновляем исходный массив
  arrayAddedToCart.value = updatedCart.map((item) => item.id); // Сохраняем только ID товаров
};

// Переключение фильтрации
const toggleFavoritesFilter = () => {
  isFilteringFavorites.value = !isFilteringFavorites.value;
  applyFilters();
};

// Создано вычисляемое свойство для получения товаров, добавленных в корзину
const cartItems = computed(() =>
  items.value.filter((item) => arrayAddedToCart.value.includes(item.id))
);

// Применение фильтров (поиск, сортировка, избранное)
const applyFilters = () => {
  let tempItems = [...items.value];

  // Фильтрация по избранному
  if (isFilteringFavorites.value) {
    tempItems = tempItems.filter((item) => item.isFavorite);
  }

  // Фильтрация по поисковому запросу
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    tempItems = tempItems.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
  }

  // Сортировка
  if (sortBy.value === "title") {
    tempItems.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy.value === "price") {
    tempItems.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === "-price") {
    tempItems.sort((a, b) => b.price - a.price);
  }

  filteredItems.value = tempItems;
};

// Следим за изменением поиска или сортировки
watch([searchQuery, sortBy], () => {
  console.log("Применение фильтров...");
  applyFilters();
});

// Первоначальная загрузка данных
onMounted(() => {
  loadFavoritesFromStorage();
  fetchProducts();
});

const itemsImg = [
  { imageUrl: "/sneakers/sneakers-1.jpg" },
  { imageUrl: "/sneakers/sneakers-2.jpg" },
  { imageUrl: "/sneakers/sneakers-3.jpg" },
  { imageUrl: "/sneakers/sneakers-4.jpg" },
  { imageUrl: "/sneakers/sneakers-5.jpg" },
  { imageUrl: "/sneakers/sneakers-6.jpg" },
  { imageUrl: "/sneakers/sneakers-7.jpg" },
  { imageUrl: "/sneakers/sneakers-8.jpg" },
];

const openDrawer = () => {
  console.log('click');

  drawerOpen.value = true;
}
const closeDrawer = () => {
  drawerOpen.value = false
}
provide('CartActions', {closeDrawer})
</script>

<template>
  <Drawer v-if="drawerOpen" :cartItems="cartItems" @updateCartItems="updateCartItems" />
  <div class="main-wrapper w-4/5 m-auto bg-white rounded-xl shadow-xl mb-14 mt-14 pb-4">
    <Header  @open-drawer="openDrawer"/>

    <div class="main-title-group flex flex-col items-center gap-4 py-4 px-8">
      <h1 class="text-3xl py-4 px-8 font-bold flex-[100%]">Все кроссовки</h1>

      <div class="controls flex justify-center items-center align-middle gap-4 w-full">
        <!-- Сортировка -->
        <select v-model="sortBy" class="border border-slate-400 rounded-lg py-2 px-4">
          <option value="">Без сортировки</option>
          <option value="title">По названию</option>
          <option value="price">Дешевые</option>
          <option value="-price">Дорогие</option>
        </select>

        <!-- Поиск -->
        <label class="w-[100%] relative">
          <img class="absolute top-3 left-3" src="/search.svg" alt="" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Поиск..."
            class="w-[100%] border border-slate-400 rounded-lg pl-8 pr-4 py-2 focus:outline-2 focus:outline-slate-400"
          />
        </label>

        <!-- Фильтр по избранному -->
        <img
          @click="toggleFavoritesFilter"
          :src="isFilteringFavorites ? '/like-2.svg' : '/like-1.svg'"
          alt="Favorites Filter"
          class="cursor-pointer w-[65px]"
        />
      </div>
    </div>

    <!-- Список карточек -->
    <CardList :items="filteredItems" @toggleFavorite="toggleFavorite" @addToCart="addToCart" />
  </div>
</template>
