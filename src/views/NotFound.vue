<template>
	<main>
		<h1>No such page! 👏</h1>
		<p>
			If you're reading this, it means you're taking a long time on the catwalks
			between pages. <br />
			The lab boys say that might be a fear reaction.
		</p>
		<card title="Go back." href="/" />
	</main>
</template>
<script lang="ts">
	import { defineComponent } from 'vue';
	import card from '@/components/card.vue';

	export default defineComponent({
		name: 'NotFound',
		components: {
			card,
		},
	});
</script>
