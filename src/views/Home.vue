<template>
	<main>
		<div class="sidebyside">
			<div>
				<div class="textcont">
					<h2>Hey there! 👋</h2>
					<p>
						My name is <router-link to="/#about">Jakub Mańczak</router-link>,
						people online call me j4mesen and I'm a high school student learning
						IT in Poznań, Poland.
					</p>
				</div>
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
