<template>
  <v-app>
    <v-sheet color="primary" dark tile>
      <v-container>
        <ToolBar class="layout-toolbar" />
      </v-container>
    </v-sheet>

    <v-content>
      <nuxt />
    </v-content>
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

h1,
h2,
h3,
h4,
h5,
h6 {
  span {
    background-size: 0%;
    &:hover {
      background-size: 100% 15%;
      background-repeat: repeat-x;
      background-position: left 0% bottom 10%;
    }
  }
}

.rainbow {
  background-image: linear-gradient(
    90deg,
    hsl(284, 91%, 69%) 0%,
    hsl(284, 91%, 69%) 12.5%,
    hsl(329, 91%, 69%) 12.5%,
    hsl(329, 91%, 69%) 25%,
    hsl(14, 91%, 69%) 25%,
    hsl(14, 91%, 69%) 37.5%,
    hsl(59, 91%, 69%) 37.5%,
    hsl(59, 91%, 69%) 50%,
    hsl(104, 91%, 69%) 50%,
    hsl(104, 91%, 69%) 62.5%,
    hsl(149, 91%, 69%) 62.5%,
    hsl(149, 91%, 69%) 75%,
    hsl(194, 91%, 69%) 75%,
    hsl(194, 91%, 69%) 87.5%,
    hsl(239, 91%, 69%) 87.5%,
    hsl(239, 91%, 69%) 100%
  );
}

.rainbow-energetic {
  background-image: repeating-linear-gradient(
    135deg,
    hsl(46, 80%, 67%) 0px,
    hsl(46, 80%, 67%) 14px,
    hsl(91, 80%, 67%) 14px,
    hsl(91, 80%, 67%) 28px,
    hsl(136, 80%, 67%) 28px,
    hsl(136, 80%, 67%) 42px,
    hsl(181, 80%, 67%) 42px,
    hsl(181, 80%, 67%) 56px,
    hsl(226, 80%, 67%) 56px,
    hsl(226, 80%, 67%) 70px,
    hsl(271, 80%, 67%) 70px,
    hsl(271, 80%, 67%) 84px,
    hsl(316, 80%, 67%) 84px,
    hsl(316, 80%, 67%) 98px,
    hsl(1, 80%, 67%) 98px,
    hsl(1, 80%, 67%) 112px
  );
}

.tapered {
  background-image: linear-gradient(
    179deg,
    rgb(254, 97, 158) 0%,
    rgb(254, 97, 158) 50%,
    transparent 54%,
    transparent 100%
  );
}

.tapered2 {
  background-image: linear-gradient(
    181deg,
    #ffa620 0%,
    #fba11a 50%,
    transparent 54%,
    transparent 100%
  );
}

.double {
  background-image: repeating-linear-gradient(
      0deg,
      rgb(246, 96, 94) 0px,
      rgb(246, 96, 94) 4px,
      transparent 4px,
      transparent 8px,
      rgb(249, 139, 40) 8px,
      rgb(249, 139, 40) 12px,
      transparent 12px,
      transparent 16px
    ),
    linear-gradient(90deg, #fff, #fff);
}

.triple {
  background-image: repeating-linear-gradient(
      0deg,
      rgb(42, 166, 224) 0px,
      rgb(42, 166, 224) 4px,
      transparent 4px,
      transparent 8px,
      rgb(48, 200, 159) 8px,
      rgb(48, 200, 159) 12px,
      transparent 12px,
      transparent 16px,
      rgb(53, 234, 94) 16px,
      rgb(53, 234, 94) 20px,
      transparent 20px,
      transparent 24px
    ),
    linear-gradient(90deg, #fff, #fff);
  background-size: 100% 24%;
  background-position: 100% 98%;
}

.graph-paper {
  background-image: repeating-linear-gradient(
      0deg,
      hsl(144, 66%, 90%) 0px,
      hsl(144, 66%, 90%) 2px,
      transparent 2px,
      transparent 7px
    ),
    repeating-linear-gradient(
      90deg,
      hsl(144, 66%, 90%) 0px,
      hsl(144, 66%, 90%) 2px,
      transparent 2px,
      transparent 7px
    ),
    linear-gradient(90deg, hsl(218, 79%, 50%), hsl(218, 79%, 50%));
}

.weave {
  background-image: repeating-linear-gradient(
      135deg,
      rgb(99, 171, 222) 0px,
      rgb(99, 171, 222) 7px,
      transparent 7px,
      transparent 14px
    ),
    repeating-linear-gradient(
      45deg,
      rgb(38, 95, 221) 0px,
      rgb(38, 95, 221) 7px,
      transparent 7px,
      transparent 14px
    ),
    repeating-linear-gradient(135deg, #fff 0px, #fff 7px, #fff 7px, #fff 14px);
}

.green {
  background-image: repeating-linear-gradient(
    90deg,
    rgb(79, 191, 86) 0px,
    rgb(79, 191, 86) 16px,
    rgb(59, 180, 83) 16px,
    rgb(59, 180, 83) 32px,
    rgb(30, 162, 80) 32px,
    rgb(30, 162, 80) 48px,
    rgb(40, 168, 81) 48px,
    rgb(40, 168, 81) 64px,
    rgb(88, 197, 87) 64px,
    rgb(88, 197, 87) 80px,
    rgb(98, 203, 88) 80px,
    rgb(98, 203, 88) 96px,
    rgb(49, 174, 82) 96px,
    rgb(49, 174, 82) 112px,
    rgb(69, 185, 85) 112px,
    rgb(69, 185, 85) 128px
  );
}

.purple {
  background-image: repeating-linear-gradient(
    135deg,
    rgb(180, 96, 226) 0px,
    rgb(180, 96, 226) 45px,
    rgb(196, 124, 232) 45px,
    rgb(196, 124, 232) 76px,
    rgb(165, 69, 221) 76px,
    rgb(165, 69, 221) 114px,
    rgb(211, 151, 237) 114px,
    rgb(211, 151, 237) 127px,
    rgb(242, 206, 248) 127px,
    rgb(242, 206, 248) 139px,
    rgb(227, 179, 243) 139px,
    rgb(227, 179, 243) 170px
  );
}

.purple-orange {
  background-image: linear-gradient(
    90deg,
    rgb(246, 137, 24) 0%,
    rgb(246, 137, 24) 31%,
    rgb(174, 62, 159) 31%,
    rgb(174, 62, 159) 42%,
    rgb(210, 100, 92) 42%,
    rgb(210, 100, 92) 49%,
    rgb(138, 25, 227) 49%,
    rgb(138, 25, 227) 100%
  );
}

.yellow-orange {
  background-image: linear-gradient(
    90deg,
    rgb(218, 230, 1) 0%,
    rgb(218, 230, 1) 7%,
    rgb(226, 203, 7) 7%,
    rgb(226, 203, 7) 14%,
    rgb(234, 176, 13) 14%,
    rgb(234, 176, 13) 21%,
    rgb(242, 148, 18) 21%,
    rgb(242, 148, 18) 28%,
    rgb(250, 121, 24) 28%,
    rgb(250, 121, 24) 100%
  );
  background-size: 100% 18%;
}
</style>
