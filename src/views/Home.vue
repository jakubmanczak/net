<template>
	<main>
		<div class="sidebyside">
			<div>
				<section class="textcont">
					<h2>Hey there! 👋</h2>
					<p>
						My name is <router-link to="/#about">Jakub Mańczak</router-link>,
						people online call me j4mesen and I'm a high school student learning
						IT in Poznań, Poland.
					</p>
					<div class="bio-links">
						<router-link to="/">steam</router-link>
						<router-link to="/">github</router-link>
						<router-link to="/">anilist</router-link>
						<router-link to="/">osu</router-link>
						<router-link to="/">discord</router-link>
					</div>
				</section>
			</div>
			<div>
				<img src="@/assets/avatar2.png" alt="An image of me." />
				<img src="@/assets/avatar3.png" alt="An image of me." />
			</div>
		</div>
	</main>
</template>

<style lang="scss" scoped>
	img {
		width: 16rem;
		border-radius: 50%;
	}
	.bio-links {
		margin: 1rem;
		a {
			margin: 0.5rem;
			color: var(--graytext);
		}
	}
</style>

<script lang="ts">
	import { defineComponent } from 'vue';
	// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

	export default defineComponent({
		name: 'Home',
		// components: {
		// 	HelloWorld,
		// },
	});
</script>
