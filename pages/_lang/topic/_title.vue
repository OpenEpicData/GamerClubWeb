<template>
  <div>
    <v-container fluid class="index-main-container grey--text">
      <v-breadcrumbs :items="breadcrumb" class="grey">
        <v-icon slot="divider">chevron_right</v-icon>
      </v-breadcrumbs>
      <div class="my-4">
        <h1>{{ $route.params.title }}</h1>
        <span>来源：{{ newsData.Site }}</span>
        <span class="ml-2">作者：{{ newsData.Author }}</span>
        <span class="ml-2">原文链接：{{ newsData.Link }} </span>
        <span class="ml-2">{{ newsData.LastUpdated }}</span>
      </div>
      <div v-if="newsData">
        <div v-html="newsData.news_articles.Body"></div>
      </div>
    </v-container>
  </div>
</template>

<style>
a {
  color: #fff;
}
.doc-blockquote {
  border: 1px solid currentColor;
  display: flex;
  font-size: 14px;
  margin: 10px auto;
  padding: 16px;
  position: relative;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.doc-blockquote p {
  margin: 0;
}
.doc-content p {
  font-size: 1.2rem;
  text-align: left !important
}
.doc-content .picbox {
  text-align: left;
}
.picinfo {
  margin: 6px 0;
  display: block;
}
.picinfo::before, .picinfo::after {
  content: '"'
}
</style>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      newsData: '',
      breadcrumb: [
        {
          text: '资讯',
          disabled: false,
          href: this.$i18n.path('topic')
        },
        {
          text: '文章详情',
          disabled: true
        }
      ]
    }
  },
  mounted: async function () {
    let [newsData] = await Promise.all([
      axios.get(
        encodeURI(
          'https://rest.steamhub.cn/api/v2/news/lists/' +
            this.$route.params.title
        )
      )
    ])
    this.newsData = newsData.data
  },
  updated: function () {
    let dom_img = document.querySelectorAll('.doc-content img')
    dom_img.forEach(element => {
      let path = element.getAttribute('data-original')
      element.setAttribute('src', path)
    })
  },
  head () {
    return {
      title: this.$route.params.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.newsData.Description
        }
      ]
    }
  }
}
</script>
