<script lang="ts">
	import { scale } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';

	import type { OptionType } from '$lib/constants/options';
	import Icon from '@iconify/svelte';

	export let model: string = '';
	export let placeholder: string = '';
	export let cn: string = '';
	export let label: string = '';
	export let error: string = '';
	export let options: OptionType[] = [];

	$: selectedOptionText = options.find((o) => o.value === model)?.text;
	let isSelectOpen = false;

	const selectOption = (s: string) => {
		model = s;
		isSelectOpen = false;
		error = '';
	};
</script>

<div class="w-full">
	{#if !!label}
		<div class="text-border/80 pl-2 text-sm font-medium {!!error && 'text-error'}">{label}</div>
	{/if}
	<button
		type="button"
		class="h-9 neo-wrap w-full outline-none{cn} flex justify-between items-center px-2 relative"
		on:click={() => (isSelectOpen = true)}
	>
		<div class="text-sm {!!error && 'text-error'}">{selectedOptionText ?? placeholder}</div>
		<Icon icon="ion:chevron-down" class="duration-[288ms] transition-all {isSelectOpen ? 'rotate-180' : ''}" />
		{#if isSelectOpen == true}
			<div
				role="presentation"
				class="fixed w-screen h-svh z-10 top-0 left-0 right-0 bottom-0"
				on:click|stopPropagation={() => (isSelectOpen = false)}
			></div>
			<div
				transition:scale={{ duration: 288, easing: quadInOut }}
				role="presentation"
				class="absolute bg-bg rounded-md p-3 select-box flex flex-col z-20 gap-1"
			>
				{#each options as option, i (i)}
					<button
						type="button"
						class="border-[1px] border-border rounded-md py-1 px-3 text-sm min-w-[120px] {option.value ===
						model
							? 'bg-primary'
							: ''}"
						on:click|stopPropagation={() => selectOption(option.value)}>{option.text}</button
					>
				{/each}
			</div>
		{/if}
	</button>
	{#if !!error}
		<div class="italic mt-1 pl-3 text-sm text-error font-medium">{error}</div>
	{/if}
</div>

<style>
	.select-box {
		box-shadow: 0px 0px 8px -2px rgba(0, 0, 0, 0.75);
		-webkit-box-shadow: 0px 0px 8px -2px rgba(0, 0, 0, 0.75);
		-moz-box-shadow: 0px 0px 8px -2px rgba(0, 0, 0, 0.75);
	}
</style>
