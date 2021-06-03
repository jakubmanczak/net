<template>
	<nav>
		<router-link to="/">home</router-link>
		<router-link to="/#about">about</router-link>
		<router-link to="/projects">projects</router-link>
		<router-link to="/config">config</router-link>
	</nav>
	<router-view />
</template>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap');
	:root {
		--black: hsl(0, 0%, 10%);
		--white: hsl(0, 0%, 90%);
		--gray: hsl(0, 0%, 20%);
		--accent: hsl(260, 45%, 62%);
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
		}
	}
	nav {
		padding: 1rem clamp(1rem, 8rem, 12rem);
		display: flex;
		justify-content: center;
		align-items: baseline;
		a {
			padding: 0.4em 1rem;
			margin: 0.4rem;
			color: inherit;
			text-decoration: inherit;
			border: 2px solid transparent;
			transition-duration: var(--trandur);
			&:hover {
				border-radius: var(--radius);
				border: 2px solid var(--gray);
				color: var(--accent);
			}
			&:active {
				background-color: var(--gray);
			}
		}
	}
	main {
		a {
			text-decoration: inherit;
			&:hover {
				text-decoration: underline;
			}
		}
		h1,
		h2,
		h3,
		h4 {
			margin-bottom: 0.5rem;
		}
		.textcont {
			max-width: 50ch;
		}
	}
	.sidebyside {
		display: flex;
		div {
			flex: 1;
		}
	}
</style>
