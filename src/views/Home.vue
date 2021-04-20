<template>
  <nav>
    <!-- <router-link to="/">:root</router-link> -->
    <a href="#my-projects">My Projects</a>
    <a href="#internet-presence">My Internet Presence</a>
    <a href="#other">Other</a>
  </nav>
  <div class="images">
    <img src="@/assets/jakub3.png" alt="" />
    <img src="@/assets/jakub2.png" alt="" />
  </div>
  <main class="short">
    <h1>Jakub Mańczak</h1>
    <p>
      Hi there! 👋 <br />
      <br />
      My name is Jakub Mańczak and I'm a high school student learning IT from
      near Poznań, Poland.
    </p>
  </main>
  <main>
    <h1>j4mesen</h1>
    <p>
      is my go-to nickname on the interwebs and in games, which I play a lot of.
      Shocker, I know, but they're the thing responsible for bringing me into
      the world of code. I spent quite a lot of my time pushing the cart in Team
      Fortress 2, defusing bombs in Counter-Strike or mining diamonds in
      Minecraft, and have even tried a few times to make my own games - it
      didn't go so well.
    </p>
  </main>
  <main id="my-projects">
    <h1>My Projects</h1>
    <div class="cardContainer">
      <card
        title="/umlaut"
        desc="A simple script for inserting german characters while holding down left alt. Created to counter the need of using a different keyboard layout."
        meta="manczak.net/umlaut · Hosted on GitHub"
        href="/umlaut"
      />
    </div>
  </main>
  <main id="internet-presence">
    <h1>My Internet Presence</h1>
    <p>
      Places where I'm available and/or present on the Internet. Very
      incomplete.
    </p>
    <div class="cardContainer">
      <card
        title="Steam"
        photo="steam.png"
        desc="Where I play games."
        meta="manczak.net/steam"
        href="/steam"
      />
      <card
        title="GitHub"
        photo="github.png"
        desc="Where I do code."
        meta="manczak.net/github"
        href="/github"
      />
      <card
        title="AniList"
        photo="anilist.png"
        desc="Where I note anime."
        meta="manczak.net/anilist"
        href="/anilist"
      />
      <card
        title="Facebook"
        photo="facebook.png"
        desc="The Zuccening."
        meta="manczak.net/facebook"
        href="/facebook"
      />
      <card
        title="Messenger"
        photo="messenger.png"
        desc="If you don't wanna go through FB."
        meta="manczak.net/messenger"
        href="/messenger"
      />
      <card
        title="Discord"
        photo="discord.png"
        desc="The go-to communication app."
        meta="j4mesen#1429"
      />
      <card
        title="YouTube"
        photo="youtube.png"
        desc="All my shitposts for everyone to see."
        meta="manczak.net/youtube"
        href="/youtube"
      />
      <card
        title="Twitter"
        photo="twitter.png"
        desc="Mostly, like, haikus and retweets."
        meta="manczak.net/twitter"
        href="/twitter"
      />
      <card
        title="Reddit"
        photo="reddit.png"
        desc="The meme machine."
        meta="manczak.net/reddit"
        href="/reddit"
      />
      <card
        title="LinkedIn"
        photo="linkedin.png"
        desc="The corpo correspondence."
        meta="manczak.net/linkedin"
        href="/linkedin"
      />
      <card
        title="Secondary Steam"
        photo="steam.png"
        desc="My secondary steam account."
        meta="steamcommunity.com/id/jakubmanczak2"
      />
      <card
        title="Lesson Plan"
        photo="plan-lekcji.png"
        desc="Shortcut to my lesson plan."
        meta="manczak.net/plan"
        href="/plan"
      />
    </div>
  </main>
  <main id="other">
    <h1>Other</h1>
    <div class="cardContainer">
      <card
        title="/csconfig"
        desc="My personal config files for CS:GO."
        meta="manczak.net/csconfig · Work In Progress"
      />
      <card
        title="/tfconfig"
        desc="My personal config files for Team Fortress 2."
        meta="manczak.net/tfconfig · Work In Progress"
      />
      <card
        title="/linux-cmds"
        desc="A list of useful linux commandline know-how with the ability to search, get more information, proper usage etc. Made to simplify Linux CMD revisions for exams."
        meta="manczak.net/linux-cmds · Work In Progress"
      />
      <card
        title="/win-cmds"
        desc="A list of useful windows commandline know-how with the ability to search, get more information, proper usage etc. Made to simplify CMD revisions for exams."
        meta="manczak.net/win-cmds · Work In Progress"
      />
    </div>
  </main>
  <main>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import card from '@/components/card.vue';

  export default defineComponent({
    name: 'Home',
    components: {
      card,
    },
  });
</script>

<style lang="sass" scoped>
  .short
    h1,p
      width: 35%
  .images
    img
      position: absolute
      top: 15%
      right: 27%
      border-radius: 50%
      height: 216px
      &:last-of-type
        right: 35%
  .cardContainer
    display: inline-flex
    flex-wrap: wrap
    margin: 1em 2em
    margin-right: -12em

  @media only screen and (max-width: 872px)
    .cardContainer
      margin: 0em 0em
      padding: 0em 0em
    .short
      h1,p
        width: 65%
    .images
      img
        height: 96px
        top: 142px
        right: 10%
        &:last-of-type
          right: 28%
</style>
