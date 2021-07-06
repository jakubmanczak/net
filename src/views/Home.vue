<template>
	<main>
		<img
			src="../assets/photo.png"
			alt="A photo of me."
			style="width: 11rem;border-radius:50%"
		/>
		<div class="heythere">
			<h1>Hey there! 👋</h1>
			<p style="max-width: 50ch">
				My name is <router-link to="about">Jakub Mańczak</router-link>, people
				online call me <em>jamesen</em> and I'm a high school student learning
				IT in Poznań, Poland.
			</p>
			<div class="links">
				<router-link to="/steam">
					<span class="icon">
						<i class="fab fa-steam"></i>
					</span>
					/jakubmanczak
				</router-link>
				<router-link to="/github">
					<span class="icon">
						<i class="fab fa-github"></i>
					</span>
					/jakubmanczak
				</router-link>
				<a href="#discord">
					<span class="icon">
						<i class="fab fa-discord"></i>
					</span>
					j4mesen#1429
				</a>
				<br />
				<router-link to="/facebook">
					<span class="icon">
						<i class="fab fa-facebook"></i>
					</span>
				</router-link>
				<router-link to="/twitter">
					<span class="icon">
						<i class="fab fa-twitter"></i>
					</span>
				</router-link>
				<router-link to="/anilist">anilist</router-link>
				<router-link to="/osu">osu!</router-link>
				<router-link to="/about">
					more.
				</router-link>
			</div>
		</div>
	</main>
</template>

<script>
	// @ is an alias to /src
	// import HelloWorld from '@/components/HelloWorld.vue'

	export default {
		name: 'Home',
		// components: {
		//   HelloWorld
		// }
	};
</script>

.<style lang="scss" scoped>
	main {
		display: flex;
		justify-content: center;
		margin-top: 5rem;
		.heythere {
			margin-left: 2rem;
			.links {
				a {
					color: var(--graytext);
					text-decoration: inherit;
					padding: 0.05rem 0.1rem;
					margin: 0.2rem;
					border-radius: calc(var(--radius) / 2);
					&:hover {
						background-color: var(--accent);
						color: var(--black);
					}
				}
			}
		}
	}
	@media only screen and (max-width: 1000px) {
		main {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}
	}
</style>
