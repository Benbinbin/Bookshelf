<script setup lang="ts">
const { data: navigation } = await useAsyncData('rootFolder', () => fetchContentNavigation())

const themeOptions = useTheme()

// // show posts
// const showRecentPosts = ref(true)

// // hide post section
// const hidePostCategorySections = ref(new Set())
// const togglePostCategorySectionsHandler = (category) => {
//   if (hidePostCategorySections.value.has(category)) {
//     hidePostCategorySections.value.delete(category)
//   } else {
//     hidePostCategorySections.value.add(category)
//   }
// }

// bookshelf
let bookFolder
const bookFolderFiles = []

// render bookshelf or not
let showBookshelf = true
if ('homePage' in themeOptions.value && 'showBookshelf' in themeOptions.value.homePage) {
  showBookshelf = themeOptions.value.homePage.showBookshelf
}

const queryBooksWhere = { _type: 'json' }
const queryBooksOnly = ['metadata', '_type', '_path']

if (showBookshelf && Array.isArray(navigation.value)) {
  bookFolder = navigation.value.find((item) => {
    return item._path === '/book'
  })

  if (bookFolder?.children && bookFolder.children.length > 0) {
    bookFolder.children.forEach((item) => {
      if (item._type === 'json') {
        bookFolderFiles.push(item)
      }
    })
  }
}

// show books
// const showBooks = ref(true)

// hide book section
const hideBookCategorySections = ref(new Set())
const toggleBookCategorySectionsHandler = (category) => {
  if (hideBookCategorySections.value.has(category)) {
    hideBookCategorySections.value.delete(category)
  } else {
    hideBookCategorySections.value.add(category)
  }
}
</script>

<template>
  <div>

    <Head>
      <Title>Home</Title>
    </Head>

      <div class="container px-8 mx-auto">
        <div class="py-8">
          <ContentDoc>
            <template #empty>
              <IntroCard :avatar="'/avatar.png'" />
            </template>
            <template #not-found>
              <h1 class="py-4 text-3xl font-bold text-center text-purple-500">Bookshelf</h1>
            </template>
          </ContentDoc>
        </div>

        <div v-if="bookFolder" class="py-8">
          <!-- <h2 class="flex justify-center items-center font-bold text-xl sm:text-3xl text-gray-600">
            <button class="px-4 py-2 rounded-md transition-colors duration-300"
              :class="showBooks ? 'text-purple-500 hover:bg-purple-100' : 'text-white bg-purple-500 hover:bg-purple-400'"
              @click="showBooks = !showBooks">
              Bookshelf
            </button>
          </h2>
          <hr class="w-1/5 my-6 mx-auto bg-purple-200"> -->

          <div class="space-y-8">
            <section class="w-full sm:w-4/5 mx-auto space-y-4">
              <div
                class="scroll-container my-6 flex overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
                <ContentQuery v-for="item in bookFolderFiles" :key="item._path" :path="item._path"
                  :only="queryBooksOnly">
                  <template #default="{ data }">
                    <NuxtLink v-for="book in data" :key="book._path" :to="book._path"
                      class="group shrink-0 w-1/3 sm:w-full">
                      <div class="book-cover-container w-fit mx-auto p-4 flex justify-center relative z-20">
                        <img v-if="book?.metadata?.covers && book.metadata.covers.length>0"
                          :src="book.metadata.covers[0]" alt="book cover"
                          class="h-20 object-contain group-hover:-translate-y-2 will-change-transform transition-transform duration-300">
                        <IconCustom v-else name="fluent-emoji:blue-book"
                          class="w-20 h-20 group-hover:-translate-y-4 will-change-transform transition-transform duration-300" />
                      </div>

                      <p class="font-bold text-center text-sm text-gray-600 group-hover:text-blue-500 transition-colors duration-300">
                        {{ book?.metadata?.title || 'Book' }}
                      </p>
                    </NuxtLink>
                  </template>
                </ContentQuery>
              </div>
            </section>

            <template v-for="category in bookFolder.children">
              <section v-if="category.children" :key="category._path" class="w-full sm:w-4/5 mx-auto space-y-4">
                <h2 class="border-l-8 border-purple-500 rounded-l-sm">
                  <button
                    class="p-1 font-bold text-lg text-purple-500 hover:bg-purple-100 border rounded-r-sm transition-colors duration-300 "
                    :class="hideBookCategorySections.has(category) ? 'border-purple-500' : 'border-transparent'"
                    @click="toggleBookCategorySectionsHandler(category)">
                    {{ category.title }}
                  </button>
                </h2>

                <div v-show="!hideBookCategorySections.has(category)"
                  class="scroll-container my-6 flex overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
                  <ContentQuery :path="category._path" :where="queryBooksWhere" :only="queryBooksOnly">
                    <template #default="{ data }">
                      <NuxtLink v-for="book in data" :key="book._path" :to="book._path"
                        class="group shrink-0 w-1/3 sm:w-full">
                        <div class="book-cover-container w-fit mx-auto p-4 flex justify-center relative z-20">
                          <img v-if="book?.metadata?.covers && book.metadata.covers.length>0"
                            :src="book.metadata.covers[0]" alt="book cover"
                            class="h-20 object-contain group-hover:-translate-y-2 will-change-transform transition-transform duration-300">
                          <IconCustom v-else name="fluent-emoji:blue-book"
                            class="w-20 h-20 group-hover:-translate-y-4 will-change-transform transition-transform duration-300" />
                        </div>

                        <p class="font-bold text-center text-sm text-gray-600 group-hover:text-blue-500 transition-colors duration-300">
                          {{ book?.metadata?.title || 'Book' }}
                        </p>
                      </NuxtLink>
                    </template>

                    <template #not-found>
                      <p>No books found.</p>
                    </template>
                  </ContentQuery>
                </div>
              </section>
            </template>
          </div>
       </div>
      </div>

  </div>
</template>

<style lang="scss" scoped>
.folders-container {
  grid-auto-rows: 40px
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

.folder-nav-container::-webkit-scrollbar {
  display: none;
}

// .book-cover-container {
//   &::after {
//     content: "";
//     @apply block h-16 absolute top-12 inset-x-0 bg-gray-200 rounded -z-10;
//   }
// }
</style>
