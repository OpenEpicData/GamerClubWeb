<template>
  <VApp>
    <VToolbar
      flat
      absolute
      color="transparent"
      dark
    >
      <VToolbarTitle>
        <nuxt-link to="/">
          <logo />
        </nuxt-link>
      </VToolbarTitle>
    </VToolbar>
    <VContent>
      <nuxt />
    </VContent>
  </VApp>
</template>

<script>
import logo from "~/components/logo";
export default {
  components: {
    logo,
  }
};
</script>
