<template>
  <div id="tipCcontainer">
    <div id="lightblue" class="maincircle show">
      <div class="show" id="logo">
        <img src="https://i.loli.net/2018/09/28/5bae0609ea694.png" />
      </div>
    </div>
    <div id="textcontainer" class="show">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  mounted () {
    setTimeout(() => {
      document.getElementById('textcontainer').setAttribute('class', 'hide'); document.getElementById('logo').setAttribute('class', 'hide')
      document.getElementsByClassName('maincircle')[0].setAttribute('class', 'maincircle hide')
    }, 3000)
  },
}
</script>
 
<style lang="stylus" scoped>
$color-1 = #1780d4
$color-2 = #141414
$color-3 = #1781d3

@keyframes grow
    0%
        width 0
        height 0
        transform scale(0)
        margin-left 0
        margin-top 0

    20%
        width 100px
        height 100px
        transform scale(1)
        margin-left -50px
        margin-top -50px

    40%
        width 100px
        height 100px
        margin-left -50px
        margin-top -50px

    70%
        width 400px
        height 100px
        margin-left -150px
        margin-top -50px

    100%
        width 400px
        height 100px
        margin-left -150px
        margin-top -50px

@keyframes growimg
    0%
        transform scale(0)
        width 0
        height 0
        margin-left 0
        margin-top 0
        top 50%
        left 50%

    65%
        transform scale(1)
        width 75px
        height 75px
        top 50%
        left 50%
        margin-top -37.5px
        margin-left -37.5px

    100%
        width 75px
        height 75px
        top 50%
        margin-top -37.5px
        left 15px
        margin-left 0

@keyframes growimgreverse
    100%
        transform scale(0)
        width 0
        height 0
        margin-left 0
        margin-top 0
        top 50%
        left 50%

    65%
        transform scale(1)
        width 75px
        height 75px
        top 50%
        left 50%
        margin-top -37.5px
        margin-left -37.5px

    0%
        width 75px
        height 75px
        top 50%
        margin-top -37.5px
        left 15px
        margin-left 0

@keyframes growtext
    0%
        width 0

    100%
        width 400px

@keyframes growtextreverse
    0%
        width 200px

    100%
        width 0px

@keyframes growcolors
    from
        display block
        width 0%
        z-index 3000

    to
        display block
        width 100%
        z-index 3000

@keyframes growcolorsreverse
    0%
        width 100%
        height 80%
        opacity 1
        font-size 2em
        transform scale(1)

    100%
        height 120%
        width 140%
        opacity 0
        z-index -1
        font-size 2.5em
        transform scale(2)

.maincircle
    border-radius 200px
    position relative
    overflow hidden
    width 100px
    height 100px
    z-index 2000
    animation-name grow
    animation-duration 3s
    animation-iteration-count 1
    animation-fill-mode forwards

    &.hide
        width 400px
        margin-left -150px
        margin-top -50px
        animation-direction reverse
        animation-delay 3s
        animation-iteration-count 1

    &.right
        position absolute
        right 0

    &#lightblue
        background $color-3

#tipCcontainer
    width 100px
    height 100px
    position fixed
    bottom 1vh
    margin 0 auto
    left 0
    right 0

#textcontainer
    width 0
    height 100px
    top -20px
    font-family 'Open Sans', sans-serif
    color white
    overflow hidden
    position absolute
    left -40px
    font-size 2rem
    z-index 3000
    white-space nowrap

    &.show
        animation-fill-mode forwards
        animation-name growtext
        animation-duration 1s
        animation-iteration-count 1
        animation-delay 2s

    &.hide
        animation-fill-mode forwards
        animation-name growtextreverse
        animation-duration 1s
        animation-iteration-count 1
        animation-delay 0

#logo
    width 0
    height 0
    position relative
    float left
    animation-fill-mode forwards
    animation-name growimg
    animation-duration 1s
    animation-iteration-count 1

    &.show
        animation-fill-mode forwards
        animation-name growimg
        animation-duration 1s
        animation-iteration-count 1
        animation-delay 0.5s

    &.hide
        width 75px
        height 75px
        left 15px
        top 50%
        margin-top -37.5px
        animation-fill-mode forwards
        animation-name growimgreverse
        animation-duration 1s
        animation-iteration-count 1
        animation-delay 3s

    img
        height 100%

.hidebar
    font-family 'Open Sans', sans-serif
    font-size 15px
    margin-left 18px
    bottom 300px
    left 0
    position absolute
    color $color-1
    border-bottom 1px solid $color-1
    padding-bottom 5px

    &:hover
        cursor pointer

#colorscontainer
    position fixed
    height 80%
    right 0
    margin-top 10%
    background $color-2
    width 0
    overflow hidden
    white-space nowrap
    z-index 10000
    color white

    h1
        font-weight 300
        margin-top 8%

    #innercontainer
        width 960px
        left 50%
        margin-left -480px
        position relative

        #colors
            a
                width 13.2%
                padding-bottom 13.2%
                position relative
                float left

    &.active
        animation-fill-mode forwards
        animation-name growcolors
        animation-duration 1s
        animation-iteration-count 1

    &.hide
        animation-fill-mode forwards
        animation-name growcolorsreverse
        animation-duration 1s
        animation-iteration-count 1

</style>
