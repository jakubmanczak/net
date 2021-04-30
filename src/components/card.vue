<template>
  <router-link v-if="href" :to="href" tag="div" class="card linkyes">
    <img alt="" v-if="photo" :src="require(`../assets/card/${photo}`)" />
    <div class="card-inner">
      <p class="title" v-if="title">{{ title }}</p>
      <p class="desc" v-if="desc">{{ desc }}</p>
      <p class="meta" v-if="meta">{{ meta }}</p>
    </div>
  </router-link>
  <div v-if="!href" class="card">
    <img alt="" v-if="photo" :src="require(`../assets/card/${photo}`)" />
    <div class="card-inner">
      <p class="title" v-if="title">{{ title }}</p>
      <p class="desc" v-if="desc">{{ desc }}</p>
      <p class="meta" v-if="meta">{{ meta }}</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'card',
    props: {
      title: String,
      photo: String,
      desc: String,
      meta: String,
      href: String,
    },
  });
</script>

<style lang="sass" scoped>
  .card
    background-color: var(--bg-two)
    display: flex
    margin: 1em
    border-radius: 8px
    width: 24em
    color: inherit
    text-decoration: inherit
    transition-duration: var(--trandur)
    img
      height: 86px
      border-radius: 8px 0 0 8px
    .card-inner
      padding: .1em
      margin-left: .5em
      .title
        font-size: 1.16em
        font-weight: 600
        letter-spacing: .1em
        margin-left: .8em
      .desc,.meta
        font-size: .8em
      .desc
        text-align: justify
      .meta
        opacity: .5
    &:focus,&:hover
      &.linkyes
        background-color: var(--bg-three)
        transform: scale(1.025)
        box-shadow: 0 0 12px black

  @media only screen and (max-width: 872px)
    .card
      transform: scale(.75) translate(-15%)
      &:focus,&:hover
        &.linkyes
          transform: scale(.8) translate(-15%)
</style>
