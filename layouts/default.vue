<template>
  <v-app>
    <v-container>
      <AppBar />
    </v-container>

    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  components: {
    AppBar: () => import('~/components/layout/AppBar')
  }
}
</script>

<style lang="sass">
.link, .underline
  text-decoration-line: none

.underline
  width: calc(100%)
  background-image: linear-gradient(transparent calc(100% - 9px),#A5C6D3 9px)
  background-repeat: no-repeat
  background-size: 0% 100%
  transition: background-size 1s


.link:hover .underline
  background-size: 100% 100%


.pointer:hover
  cursor: pointer
</style>
