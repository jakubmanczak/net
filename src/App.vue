<template>
	<nav>
		<div class="title">
			<router-link to="/">Jakub Mańczak</router-link>
			<!-- <router-link to="/about">Jakub Mańczak</router-link> -->
		</div>
		<div class="links">
			<router-link to="/">Home</router-link>
			<router-link to="/about">About</router-link>
			<router-link to="/projects">Projects</router-link>
			<router-link to="/config">Config</router-link>
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
		--grayish: hsl(0, 0%, 12%);
		--halfway: hsl(0, 0%, 50%);
		--red: hsl(0, 55%, 62%);
		--green: hsl(136, 55%, 62%);
		--blue: hsl(200, 55%, 62%);
		--purple: hsl(264, 55%, 62%);
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
			color: var(--purple);
		}
	}
	nav {
		padding: 1.8rem 8rem;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		.title > a {
			font-size: 1.4rem;
		}
		a {
			color: inherit;
			text-decoration: inherit;
			padding: 0.4em 1rem;
			margin: 0.4rem;
			border: 2px transparent solid;
			border-radius: var(--radius);
			transition-duration: var(--trandur);
			&:hover {
				border: 2px var(--gray) solid;
				color: var(--purple);
			}
			&:active {
				border: 2px var(--gray) solid;
				background: var(--gray);
			}
		}
	}
	main {
		padding: 0 2em;
	}
</style>
