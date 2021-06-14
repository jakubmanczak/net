<template>
	<!-- <div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<HelloWorld msg="Welcome to Your Vue.js App" />
	</div> -->
	<main>
		<img src="@/assets/avatar3.png" alt="A photo of me." />
		<div>
			<h2>Hey there! 👋</h2>
			<p>
				My name is <router-link to="/about">Jakub Mańczak</router-link>, people
				online call me j4mesen and I'm a high school learning IT in Poznań,
				Poland.
			</p>
		</div>
	</main>
</template>

<style lang="scss" scoped>
	img {
		width: 12rem;
		border-radius: 50%;
		margin-right: 2rem;
	}
	main {
		display: flex;
		justify-content: center;
		padding: 4rem;
		// flex-direction: column;
		p {
			max-width: 50ch;
		}
	}
</style>

<script>
	// 	// @ is an alias to /src
	// 	import HelloWorld from '@/components/HelloWorld.vue'

	// 	export default {
	// 	  name: 'Home',
	// 	  components: {
	// 	    HelloWorld
	// 	  }
	// 	}
	//
</script>
