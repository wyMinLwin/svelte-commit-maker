<script lang="ts">
	export let model: string = '';
	export let placeholder: string = '';
	export let cn: string = '';
	export let label: string = '';
	export let error: string = ''
</script>

<div class="w-full">
	{#if !!label}
		<div class="text-border/80 pl-2 text-sm font-medium {!!error && 'text-error'}">{label}</div>
	{/if}
	<input
		type="text"
		bind:value={model}
		on:input={() => error = ""}
		{placeholder}
		class="px-2 outline-none neo-wrap h-9 text-sm w-full {!!error && 'placeholder:text-error'} {cn}"
	/>
	{#if !!error}
		<div class="italic mt-1 pl-3 text-sm text-error font-medium">{error}</div>
	{/if}
</div>
