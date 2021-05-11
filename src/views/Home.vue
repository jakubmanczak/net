<template>
	<main>
		<section>
			<h1>Hey There! 👋</h1>
			<p>
				My name is Jakub Mańczak, people online call me j4mesen and I'm a high
				school student learning IT in Poznań, Poland.
			</p>
			<br />
			<router-link to="/about">About Me</router-link>
			<router-link to="/projects">My Projects</router-link>
		</section>
		<section>
			<div class="big">
				<img src="@/assets/jakub2.png" alt="" />
				<img src="@/assets/jakub3.png" alt="" />
			</div>
			<div class="small">
				<img src="@/assets/meowmura.png" alt="" />
				<img src="@/assets/sayori.jpg" alt="" />
				<img src="@/assets/medic.png" alt="" />
				<img src="@/assets/ratman.png" alt="" />
				<p>
					(Avatars I use on social media platforms.)
				</p>
			</div>
		</section>
	</main>
	<footer>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
			<path
				fill="var(--grayish)"
				fill-opacity="1"
				d="M0,192L80,202.7C160,213,320,235,480,234.7C640,235,800,213,960,202.7C1120,192,1280,192,1360,192L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
			></path>
		</svg>
		<section style="display: flex; justify-content: space-between">
			<div>
				<h4>manczak.net</h4>
				<p>
					2019 - 2021 | on <router-link to="/source-code">GitHub</router-link>.
				</p>
			</div>
			<div class="footer-right">
				<router-link to="/steam">Steam</router-link>
				·
				<router-link to="/github">GitHub</router-link>
				·
				<router-link to="/anilist">AniList</router-link>
				·
				<router-link to="/facebook">Facebook</router-link>
			</div>
		</section>
	</footer>
</template>

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

<style lang="scss" scoped>
	main {
		display: flex;
		height: 55vh;
		align-items: center;
		max-width: fit-content;
		margin: 0 auto;
		section {
			max-width: 50ch;
			h1 {
				margin-bottom: 1rem;
			}
			a {
				color: inherit;
				text-decoration: inherit;
				// background-color: var(--grayish);
				border: 2px var(--gray) solid;
				border-radius: var(--radius);
				width: fit-content;
				display: inline-block;
				padding: 0.8rem 2.2rem;
				margin: 1rem;
				transition-duration: var(--trandur);
				&:hover {
					box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.5);
					color: var(--purple);
					background-color: var(--grayish);
					border: 2px var(--grayish) solid;
				}
			}
			&:last-of-type {
				margin-left: 2rem;
			}
			.big {
				img {
					border-radius: 50%;
					border: none;
					width: 16rem;
					&:nth-of-type(2) {
						position: absolute;
						margin-left: -5rem;
						z-index: -1;
					}
				}
			}
			.small {
				img {
					width: 6rem;
					border-radius: 50%;
					border: 3px var(--gray) solid;
					margin: 0.2rem 0.25rem;
					transition-duration: var(--trandur);
					&:hover {
						border: 3px var(--white) solid;
						cursor: pointer;
						box-shadow: 0 0 1rem rgba(255, 255, 255, 0.5);
					}
				}
				p {
					color: var(--halfway);
					text-align: center;
				}
			}
		}
	}
	footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: var(--grayish);
		svg {
			position: fixed;
			bottom: 0;
			z-index: -1;
		}
		section {
			padding: 1rem 12rem;
			.footer-right {
				a {
					color: var(--halfway);
					text-decoration: inherit;
					&:hover {
						color: var(--purple);
						text-decoration: underline;
					}
				}
			}
		}
	}
</style>
