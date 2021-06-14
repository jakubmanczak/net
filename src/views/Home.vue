<template>
	<main>
		<img src="@/assets/avatar3.png" alt="A photo of me." />
		<div>
			<h2>Hey there! 👋</h2>
			<p>
				My name is <router-link to="/about">Jakub Mańczak</router-link>, people
				online call me j4mesen and I'm a high school student learning IT in
				Poznań, Poland.
			</p>
			<div class="bio-links">
				<router-link to="/steam" target="_blank">
					<i class="fab fa-steam"></i>
					/jakubmanczak
				</router-link>
				<router-link to="/github" target="_blank">
					<i class="fab fa-github"></i>
					/jakubmanczak
				</router-link>
				<a href="#">
					<i class="fab fa-discord"></i>
					j4mesen#1429
				</a>
			</div>
			<div class="bio-links">
				<router-link to="/facebook" target="_blank">
					<i class="fab fa-facebook"></i>
				</router-link>
				<router-link to="/youtube" target="_blank">
					<i class="fab fa-youtube"></i>
				</router-link>
				<router-link to="/twitter" target="_blank">
					<i class="fab fa-twitter"></i>
				</router-link>
				<router-link to="/reddit" target="_blank">
					<i class="fab fa-reddit"></i>
				</router-link>
				<router-link to="/linkedin" target="_blank">
					<i class="fab fa-linkedin"></i>
				</router-link>
				<router-link to="/anilist" target="_blank">anilist</router-link>
				<router-link to="/osu">osu</router-link>
				<router-link to="/about">more.</router-link>
			</div>
		</div>
	</main>
	<main>
		<router-link to="/about" class="button">
			More About Me
		</router-link>
		<router-link to="/projects" class="button">
			Things I've done and made
		</router-link>
		<router-link to="/config" class="button">
			Settings I use
		</router-link>
	</main>
</template>

<style lang="scss" scoped>
	img {
		width: 12rem;
		height: 12rem;
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
	.bio-links {
		display: flex;
		a {
			display: inline-block;
			color: var(--graytext);
			padding: 0.1rem 0.3rem;
			margin: 0.1rem 0.5rem;
			&:hover {
				color: var(--black);
				background-color: var(--accent);
				text-decoration: inherit;
				border-radius: calc(var(--radius) / 2);
			}
		}
	}
	.button {
		color: inherit;
		padding: 0.5rem 1.5rem;
		margin: 1.5rem;
		// border: 2px solid var(--gray);
		border: 2px solid var(--black);
		border-radius: var(--radius);
		&:hover {
			// background-color: var(--gray);
			background-color: inherit;
			// color: var(--accent);
			border: 2px solid var(--gray);
			text-decoration: inherit;
			border-radius: var(--radius);
			box-shadow: 0px 12px 16px black;
		}
	}
</style>

<script>
	// // @ is an alias to /src
	// 	import HelloWorld from '@/components/HelloWorld.vue'

	// 	export default {
	// 	  name: 'Home',
	// 	  components: {
	// 	    HelloWorld
	// 	  }
	// 	}
	//
</script>
