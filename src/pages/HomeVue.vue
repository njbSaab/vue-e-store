<script setup>
import { onMounted, watch, ref } from "vue";
import axios from "axios";

const items = ref([]);
const sortBy = ref("");
const searchQuery = ref("");

// Функция загрузки данных
const fetchProducts = async () => {
  try {
    const { data } = await axios.get("https://dummyjson.com/products?limit=20");
    items.value = data.products.map((item, index) => ({
      ...item,
      imageUrl: itemsImg[index % itemsImg.length]?.imageUrl || "",
    }));
    console.log("Продукты:", items.value);
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
};

// Функция загрузки отсортированных данных
const fetchSortedProducts = async () => {
  try {
    const { data } = await axios.get(`https://dummyjson.com/products?sortBy=${sortBy.value}`);
    items.value = data.products.map((item, index) => ({
      ...item,
      imageUrl: itemsImg[index % itemsImg.length]?.imageUrl || "",
    }));
    console.log("Сортированные данные:", items.value);
  } catch (error) {
    console.error("Ошибка сортировки:", error);
  }
};

const findByTitle = async (title) => {
  try {
    const { data } = await axios.get(`https://dummyjson.com/products/search?q=${title}`);
    items.value = data.products.map((item, index) => ({
      ...item,
      imageUrl: itemsImg[index % itemsImg.length]?.imageUrl || "",
    }));
    console.log("Найденные данные:", items.value);
  } catch (error) {
    console.error("Ошибка поиска:", error);
  }
}

// Функция поиска// Функция поиска
const fetchProductsBySearch = async () => {
  if (!searchQuery.value.trim()) {
    console.log("Поле ввода пустое, поиск не выполняется");
    return; // Не выполняем запрос, если значение пустое
  }

  try {
    const { data } = await axios.get(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery.value)}`
    );
    items.value = data.products.map((item, index) => ({
      ...item,
      imageUrl: itemsImg[index % itemsImg.length]?.imageUrl || "",
    }));
    console.log("Результаты поиска:", items.value);
  } catch (error) {
    console.error("Ошибка поиска:", error);
  }
};

// Следим за изменением сортировки
watch(sortBy, async (newSort) => {
  console.log("Сортировка:", newSort);
  if (newSort) {
    await fetchSortedProducts();
  } else {
    await fetchProducts();
  }
});

// Следим за изменением поля поиска
watch(searchQuery, async () => {
  console.log("Поиск:", searchQuery.value);
  await fetchProductsBySearch();
});



// Первоначальная загрузка данных
onMounted(fetchProducts);

// Массив изображений
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
</script>

<template>
  <div class="main-wrapper w-4/5 m-auto bg-white rounded-xl shadow-xl mb-14 mt-14 pb-4">
        <Header/>

    <div class="main-title-group flex items-center gap-4 py-4 pr-8">
      <!-- Заголовок -->
      <h1 class="text-3xl py-4 px-8 font-bold flex-[100%]">Все кроссовки</h1>

      <!-- Поле поиска -->
      <label class="w-full mr-8 relative">
        <img class="absolute top-3 left-3" src="/search.svg" alt="" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Поиск..."
          class="w-[100%] border border-slate-400 rounded-lg pl-8 pr-4 py-2 focus:outline-2 focus:outline-slate-400"
        />
      </label>

      <!-- Сортировка -->
      <select @change="sortBy = $event.target.value" class="border border-slate-400 rounded-lg py-2 px-4">
        <option value="">Без сортировки</option>
        <option value="title">По названию</option>
        <option value="price">Дешевые</option>
        <option value="-price">Дорогие</option>
      </select>
    </div>
    <CardList :items="items" />
  </div>
</template>
