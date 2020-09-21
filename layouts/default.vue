<template>
  <v-app>
    <v-sheet color="primary" dark tile>
      <v-container>
        <ToolBar class="layout-toolbar" />
      </v-container>
    </v-sheet>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {
    ToolBar: () => import('~/components/layout/ToolBar')
  }
}
</script>

<style lang="sass">
.link, .underline
  text-decoration-line: none

.underline:hover
  text-decoration-line: underline

.pointer:hover
  cursor: pointer
</style>

<style lang="scss">
.drop-shadow {
  &:hover {
    filter: drop-shadow(0 0 16px #085ff4);
  }
}

.layout-toolbar {
  .v-toolbar__content {
    padding: 0;
  }
}

a {
  text-decoration-line: none;
  &:hover {
    text-decoration: underline;
  }
}

.line-clamp-2 {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
