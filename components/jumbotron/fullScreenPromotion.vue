<template>
  <VLayout
    align-center
    justify-center
    class="white--text"
  >
    <VImg
      :aspect-ratio="16/9"
      src="https://i.loli.net/2018/11/15/5bed603019f22.png"
      height="100vh"
      gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
    >
      <VLayout
        align-space-between
        justify-space-between
        fill-height
        column
      >
        <div />
        <div>
          <h1 class="display-4">
            <span class="font-weight-thin">
              准确完整的
            </span>
            <span class="font-weight-black">
              Steam 数据
            </span>
          </h1>
          <h2 class="display-2 my-2">
            <span>
              通过 SteamHub,探索你不知道的 Steam 秘密
            </span>
          </h2>
          <div>
            <VBtn
              round
              large
              color="primary"
              to="/game/trending"
            >
              查看趋势
            </VBtn>
            <VBtn
              round
              large
              outline
              dark
              to="/game/"
            >
              浏览游戏
            </VBtn>
          </div>
        </div>
        <div>
          <VIcon
            x-large 
            dark
          >
            fas fa-angle-double-down faa-bounce animated
          </VIcon>
        </div>
      </VLayout>
    </VImg>
  </VLayout>
</template>
