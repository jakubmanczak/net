<template>
	<div class="columns">
		<div class="column photocolumn">
			<img
				src="../assets/photo.png"
				alt="A photo of me."
				style="width: 12rem;border-radius:50%"
			/>
		</div>
		<div class="column textcolumn">
			<h1>Hey there! 👋</h1>
			<p style="max-width: 50ch">
				My name is <router-link to="about">Jakub Mańczak</router-link>, people
				online call me j4mesen and I'm a high school student learning IT in
				Poznań, Poland.
			</p>
		</div>
	</div>
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
	.photocolumn {
		text-align: right;
	}
	@media only screen and (max-width: 1000px) {
		.photocolumn {
			text-align: center;
		}
	}
</style>
