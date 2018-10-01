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
