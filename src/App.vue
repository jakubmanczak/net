<template>
	<nav>
		<router-link to="/" class="name">Jakub Mańczak</router-link>
		<div>
			<router-link to="/about">about</router-link>
			<router-link to="/blog">blog</router-link>
			<router-link to="/projects">projects</router-link>
			<router-link to="/config">config</router-link>
		</div>
	</nav>
	<router-view />
</template>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap');
	:root {
		--black: hsl(0, 0%, 10%);
		--white: hsl(0, 0%, 90%);
		--gray: hsl(0, 0%, 20%);
		--graytext: hsl(0, 0%, 55%);
		--accent: hsl(260, 45%, 62%);
		--accent-light: hsla(260, 45%, 62%, 0.15);
		--radius: 6px;
		--trandur: 0.1s;
	}
	* {
		margin: 0;
		padding: 0;
	}
	body {
		background-color: var(--black);
		color: var(--white);
		font-family: 'Quicksand', sans-serif;
		a {
			color: var(--accent);
			transition-duration: var(--trandur);
			&:hover {
				background-color: var(--accent-light);
				border-radius: calc(var(--radius) / 2) calc(var(--radius) / 2) 0 0;
			}
		}
		nav {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			padding: 1rem clamp(1rem, 8rem, 12rem);
			a {
				padding: 0.4rem 1rem;
				margin: 0.4rem;
				color: inherit;
				text-decoration: inherit;
				border: 2px solid transparent;
				transition-duration: var(--trandur);
				border-radius: var(--radius);
				&.name {
					font-size: 1.4rem;
				}
				&.disabled {
					color: var(--graytext);
					cursor: default;
				}
				&:not(.disabled) {
					&:hover {
						background-color: var(--black);
						border-radius: var(--radius);
						border: 2px solid var(--gray);
						color: var(--accent);
					}
					&:active {
						background-color: var(--gray);
					}
					&:not(.name) {
						&.router-link-exact-active {
							text-decoration: underline;
						}
					}
				}
			}
		}
	}
</style>
