<template>
	<Home />
	<p>This is certainly... a thing.</p>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import Home from './Home.vue'; // @ is an alias to /src

	export default defineComponent({
		name: 'Homepage',
		components: {
			Home,
		},
	});
</script>
