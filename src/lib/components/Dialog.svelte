<script lang="ts">
	import { scale, fade } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';
	export let isDialogOpen = false;
	const dispatch = createEventDispatcher();
</script>

{#if isDialogOpen}
	<div
		transition:fade={{ duration: 288, easing: quadInOut }}
		class="fixed top-0 left-0 right-0 bottom-0 w-full h-svh bg-black/40 flex justify-center items-center"
	>
		<div
			class="w-[95vw] sm:w-[500px] px-3 py-5 rounded-md bg-bg relative"
			transition:scale={{ duration: 288, easing: quadInOut }}
		>
			<button class="ml-auto absolute right-1.5 top-1.5" on:click={() => dispatch('closeDialog')}>
				<Icon icon={'majesticons:close'} class="text-error" font-size={20} />
			</button>
			<slot />
		</div>
	</div>
{/if}
