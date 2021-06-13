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
						<router-link to="/">
							<i class="fab fa-steam"></i>
							/jakubmanczak
						</router-link>
						<router-link to="/">
							<i class="fab fa-github"></i>
							/jakubmanczak
						</router-link>
						<a href="#">
							<i class="fab fa-discord"></i>
							j4mesen#1429
						</a>
						<router-link to="/">
							<i class="fab fa-facebook"></i>
						</router-link>
						<router-link to="/">
							<i class="fab fa-youtube"></i>
						</router-link>
						<router-link to="/">
							<i class="fab fa-twitter"></i>
						</router-link>
						<router-link to="/">
							<i class="fab fa-reddit"></i>
						</router-link>
						<router-link to="/">
							<i class="fab fa-linkedin"></i>
						</router-link>
						<router-link to="/">anilist</router-link>
						<router-link to="/">osu</router-link>
						<router-link to="/">more.</router-link>
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
		margin: 0 !important;
		flex-wrap: wrap;
		a {
			margin: 0.4rem;
			padding: 0 0.2rem;
			color: var(--graytext);
			transition-duration: var(--trandur);
			&:hover {
				background-color: var(--accent);
				color: var(--black);
				text-decoration: inherit;
				border-radius: 4px;
			}
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
