<template>
  <div>
    <v-container grid-list-sm>
      <v-card color="primary" dark>
        <v-card-text>
          功能开发中
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Steam 工具 -- SteamHub',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'SteamHub 团队创作的一些原创工具或者是收录其他作者的工具,不仅提供 Steam 个人资料查询, ID 转换, 还包括 Steam 访问障碍解决方案等'
        }
      ]
    }
  }
}
</script>