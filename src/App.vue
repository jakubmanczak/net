<template>
  <nav>
    <router-link to="/" class="brand">
      <img src="@/assets/logo.png" alt="" />
      <h1>manczak.net</h1>
    </router-link>
    <router-link to="/">Primary</router-link>
    <router-link to="/">Secondary</router-link>
    <router-link to="/">Tertiary</router-link>
    <p>|</p>
    <router-link to="/">Blog</router-link>
  </nav>
  <router-view />
  <main>
    <h2>manczak.net</h2>
    <p>
      <router-link to="/site-repo">Hosted on GitHub.</router-link> <br />
      2019-2021
    </p>
  </main>
</template>

<style lang="sass">
  @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap')
  *
    margin: 0
    padding: 0
  :root
    --bg: #1a1a1a
    --bg-two: #212121
    --bg-three: #313131
    --font: #c0c0c0
    --accent: #fb636b
    --trandur: 100ms
  html
    font-family: 'Raleway', sans-serif
  body
    background-color: var(--bg)
    color: var(--font)
    a
      color: var(--accent)
    nav
      background-color: var(--bg-two)
      display: flex
      align-items: center
      padding: 1em 2em
      &:last-of-type
        background-color: var(--bg-three)
      .brand
        display: flex
        transition-duration: var(--trandur)
        img
          width: 28px
          margin-right: 0
      *
        color: inherit
        text-decoration: inherit
        margin: 0 .5em
    main
      margin: 4em 14em
      p
        margin: .5em 1em
</style>
