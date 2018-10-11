<template>
  <div class="pt-5">
    <h1 class="display-4 text-xs-center">页面维护中</h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  head () {
    return {
      title: this.$t('global.page.game.info.title', { AppID: this.appid, title: this.title }),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('global.page.game.info.description', { AppID: this.appid, title: this.title })
        }
      ]
    }
  }
}
</script>