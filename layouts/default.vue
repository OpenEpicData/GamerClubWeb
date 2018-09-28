<template>
  <v-app id="inspire" class="grey lighten-4">
    <ToolBar :ToolBar.sync="ToolBar"></ToolBar>
    <div class="grey lighten-4 my-5">
      <nuxt />
    </div>
    <div id="tipCcontainer">
      <div id="lightblue" class="maincircle show">
        <div class="show" id="logo">
          <img src="https://i.loli.net/2018/09/28/5bae0609ea694.png" />
        </div>
      </div>
      <div id="textcontainer" class="show">{{ $t('Welcome, tourists') }}</div>
    </div>
    <BottomNav :BottomNav.sync="BottomNav"></BottomNav>
  </v-app>
</template>

<script>
import ToolBar from '~/components/ToolBar/Default'
import BottomNav from '~/components/BottomNav/Default'

export default {
  components: {
    ToolBar,
    BottomNav
  },
  data: () => ({
    ToolBar: {
      title: 'SteamHub',
      items: {
        left: [
          { value: 'home', link: '' },
          { value: 'game', link: 'apps/pages/' },
          { value: 'search', link: 'search', key: 0 }
        ]
      }
    },
    BottomNav: {
      items: [
        { value: 'search', icon: 'search', link: 'search', key: 0 },
        { value: 'home', icon: 'list', link: '' },
        { value: 'Join the community', icon: 'add_circle_outline', click: true }
      ]
    },
    languge: String
  }),
  props: {
    source: String
  },
  created () {
    if (this.$store.state.locale === 'zh-cn') this.languge = 'zh-cmn-Hans'
    if (this.$store.state.locale === 'en-us') this.languge = 'en-US'
  },
  mounted () {
    setTimeout(function () {
      document.getElementById('textcontainer').setAttribute('class', 'hide'); document.getElementById('logo').setAttribute('class', 'hide')
      document.getElementsByClassName('maincircle')[0].setAttribute('class', 'maincircle hide')
    }, 3000)
  },
  head () {
    return {
      htmlAttrs: {
        lang: this.languge
      }
    }
  }
}
</script>

<style>
@media (min-width: 1264px) {
  .index-main-container {
    width: 1700px;
    max-width: 90%;
  }
}
@media (max-width: 960px) {
  .page-main {
    margin: 20px 0 10px 0;
  }
}
@media (max-width: 600px) {
  .page-main {
    margin: 10px 0 0 0;
  }
  .v-toolbar__content {
    height: 0 !important;
  }
}
</style>

  <style>
    @keyframes grow {
      0% {
        width: 0;
        height: 0;
        transform: scale(0);
        margin-left: 0;
        margin-top: 0;
      }

      20% {
        width: 100px;
        height: 100px;
        transform: scale(1);
        margin-left: -50px;
        margin-top: -50px;
      }

      40% {
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
      }

      70% {
        width: 400px;
        height: 100px;
        margin-left: -150px;
        margin-top: -50px;
      }

      100% {
        width: 400px;
        height: 100px;
        margin-left: -150px;
        margin-top: -50px;
      }
    }

    @keyframes growimg {
      0% {
        transform: scale(0);
        width: 0;
        height: 0;
        margin-left: 0;
        margin-top: 0;
        top: 50%;
        left: 50%;
      }

      65% {
        transform: scale(1);
        width: 75px;
        height: 75px;
        top: 50%;
        left: 50%;
        margin-top: -37.5px;
        margin-left: -37.5px;
      }

      100% {
        width: 75px;
        height: 75px;
        top: 50%;
        margin-top: -37.5px;
        left: 15px;
        margin-left: 0;
      }
    }

    @keyframes growimgreverse {
      100% {
        transform: scale(0);
        width: 0;
        height: 0;
        margin-left: 0;
        margin-top: 0;
        top: 50%;
        left: 50%;
      }

      65% {
        transform: scale(1);
        width: 75px;
        height: 75px;
        top: 50%;
        left: 50%;
        margin-top: -37.5px;
        margin-left: -37.5px;
      }

      0% {
        width: 75px;
        height: 75px;
        top: 50%;
        margin-top: -37.5px;
        left: 15px;
        margin-left: 0;
      }
    }

    @keyframes growtext {
      0% {
        width: 0;
      }

      100% {
        width: 400px;
      }
    }

    @keyframes growtextreverse {
      0% {
        width: 200px;
      }

      100% {
        width: 0px;
      }
    }

    @keyframes growcolors {
      from {
        display: block;
        width: 0%;
        z-index: 3000;
      }

      to {
        display: block;
        width: 100%;
        z-index: 3000;
      }
    }

    @keyframes growcolorsreverse {
      0% {
        width: 100%;
        height: 80%;
        opacity: 1;
        font-size: 2em;
        transform: scale(1);
      }

      100% {
        height: 120%;
        width: 140%;
        opacity: 0;
        z-index: -1;
        font-size: 2.5em;
        transform: scale(2);
      }
    }

    .maincircle {
      border-radius: 200px;
      position: relative;
      overflow: hidden;
      width: 100px;
      height: 100px;
      z-index: 2000;
      animation-name: grow;
      animation-duration: 3s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
    }

    .maincircle.hide {
      width: 400px;
      margin-left: -150px;
      margin-top: -50px;
      animation-direction: reverse;
      animation-delay: 3s;
      animation-iteration-count: 1;
    }

    .maincircle.right {
      position: absolute;
      right: 0;
    }

    #tipCcontainer {
      width: 100px;
      height: 100px;
      position: fixed;
      top: 90%;
      margin:0 auto;
      left:0;
      right:0;
    }

    #textcontainer {
      width: 0;
      height: 100px;
      top: -20px;
      font-family: 'Open Sans', sans-serif;
      color: white;
      overflow: hidden;
      position: absolute;
      left: -40px;
      font-size: 2rem;
      z-index: 3000;
      white-space: nowrap;
    }

    #textcontainer.show {
      animation-fill-mode: forwards;
      animation-name: growtext;
      animation-duration: 1s;
      animation-iteration-count: 1;
      animation-delay: 2s;
    }

    #textcontainer.hide {
      animation-fill-mode: forwards;
      animation-name: growtextreverse;
      animation-duration: 1s;
      animation-iteration-count: 1;
      animation-delay: 0;
    }

    #logo {
      width: 0;
      height: 0;
      position: relative;
      float: left;
      animation-fill-mode: forwards;
      animation-name: growimg;
      animation-duration: 1s;
      animation-iteration-count: 1;
    }

    #logo.show {
      animation-fill-mode: forwards;
      animation-name: growimg;
      animation-duration: 1s;
      animation-iteration-count: 1;
      animation-delay: .5s;
    }

    #logo.hide {
      width: 75px;
      height: 75px;
      left: 15px;
      top: 50%;
      margin-top: -37.5px;
      animation-fill-mode: forwards;
      animation-name: growimgreverse;
      animation-duration: 1s;
      animation-iteration-count: 1;
      animation-delay: 3s;
    }

    #logo img {
      height: 100%;
    }

    .hidebar {
      font-family: "Open Sans", sans-serif;
      font-size: 15px;
      margin-left: 18px;
      bottom: 300px;
      left: 0;
      position: absolute;
      color: #1780d4;
      border-bottom: 1px solid #1780d4;
      padding-bottom: 5px;
    }

    .hidebar:hover {
      cursor: pointer;
    }

    #colorscontainer {
      position: fixed;
      height: 80%;
      right: 0;
      margin-top: 10%;
      background: #141414;
      width: 0;
      overflow: hidden;
      white-space: nowrap;
      z-index: 10000;
      color: white;
      font-family: 'Open Sans', sans-serif;
    }

    #colorscontainer h1 {
      font-weight: 300;
      margin-top: 8%;
    }

    #colorscontainer #innercontainer {
      width: 960px;
      left: 50%;
      margin-left: -480px;
      position: relative;
    }

    #colorscontainer #innercontainer #colors a {
      width: 13.2%;
      padding-bottom: 13.2%;
      position: relative;
      float: left;
    }

    #colorscontainer.active {
      animation-fill-mode: forwards;
      animation-name: growcolors;
      animation-duration: 1s;
      animation-iteration-count: 1;
    }

    #colorscontainer.hide {
      animation-fill-mode: forwards;
      animation-name: growcolorsreverse;
      animation-duration: 1s;
      animation-iteration-count: 1;
    }

    a {
      text-decoration: none;
      margin-right: 10px;
    }

    a#lightblue {
      background: #1781d3;
    }

    a#lightblue.hidebar {
      background: transparent;
      border-bottom: 1px solid #1781d3;
      color: #1781d3;
    }

    .maincircle#lightblue {
      background: #1781d3;
    }
  </style>