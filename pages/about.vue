<script setup lang="ts">

</script>

<template>
  <div>

    <Head>
      <Title>About</Title>
    </Head>

      <ContentDoc class="about-me-content-container container mx-auto lg:max-w-4xl px-6 md:px-12 py-12">
        <template #not-found>
          <div class="about-me-content-container">
            <h1>
              About
            </h1>
            <p class="max-w-prose mx-auto">
              This website is my Digital Bookshelf built by <a href="https://github.com/Benbinbin/Bookshelf" target="_blank"
                class="text-blue-600 font-bold">Bookshelf</a>.
            </p>
          </div>
        </template>
      </ContentDoc>

  </div>
</template>

<style lang="scss">
.about-me-content-container {
  h1 {
    @apply py-8 text-3xl md:text-5xl font-bold text-center
  }

  h2 {
    @apply py-8 text-2xl font-bold text-center
  }

  p {
    @apply py-4 text-lg text-gray-500
  }
}
</style>
