<template>
  <v-app>
    <div>
      <appbar />
    </div>

    <changelog />

    <v-content class="secondary">
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import appbar from '~/components/layout/appbar'
import changelog from '~/components/notice/changelog'
export default {
  components: {
    appbar,
    changelog
  },
  data() {
    return {
      dialog: false
    }
  }
}
</script>

<style lang="scss">
.theme--dark.v-list {
  background: #3d4a5c !important;
}
.secondary-primary {
  background: linear-gradient(90deg, #3d4a5c, #243042);
}
.v-card {
  $height: 34px;
  .v-toolbar__content {
    height: $height !important;
  }
  .v-toolbar__content {
    padding: 0px 14px;
  }
}

.link {
  text-decoration-line: none;
}
.underline {
  text-decoration-line: none;
  width: calc(100%);
  background-image: linear-gradient(
    transparent calc(100% - 10px),
    #33993d 10px
  );
  background-repeat: no-repeat;
  background-size: 0% 100%;
  transition: background-size 1s;
}

.link:hover .underline {
  background-size: 100% 100%;
}

.pointer:hover {
  cursor: pointer;
}

.theme--dark.v-skeleton-loader .v-skeleton-loader__actions,
.theme--dark.v-skeleton-loader .v-skeleton-loader__article,
.theme--dark.v-skeleton-loader .v-skeleton-loader__card-heading,
.theme--dark.v-skeleton-loader .v-skeleton-loader__card-text,
.theme--dark.v-skeleton-loader .v-skeleton-loader__date-picker,
.theme--dark.v-skeleton-loader .v-skeleton-loader__list-item,
.theme--dark.v-skeleton-loader .v-skeleton-loader__list-item-avatar,
.theme--dark.v-skeleton-loader .v-skeleton-loader__list-item-text,
.theme--dark.v-skeleton-loader .v-skeleton-loader__list-item-two-line,
.theme--dark.v-skeleton-loader .v-skeleton-loader__list-item-avatar-two-line,
.theme--dark.v-skeleton-loader .v-skeleton-loader__list-item-three-line,
.theme--dark.v-skeleton-loader .v-skeleton-loader__list-item-avatar-three-line,
.theme--dark.v-skeleton-loader .v-skeleton-loader__table-heading,
.theme--dark.v-skeleton-loader .v-skeleton-loader__table-thead,
.theme--dark.v-skeleton-loader .v-skeleton-loader__table-tbody,
.theme--dark.v-skeleton-loader .v-skeleton-loader__table-tfoot {
  background: transparent !important;
}

::-webkit-scrollbar {
  background-color: #3d4a5c;
  width: 12px;
  background-clip: padding-box;
}

/*滚动条中间滑动部分*/
::-webkit-scrollbar-thumb {
  background-color: #243042;
}
</style>
