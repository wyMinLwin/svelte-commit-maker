<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { tags, statuses, priorities } from '$lib/constants/options';
	
	import { commitIdRegex } from '$lib/regexes';
	import Input from '$lib/components/Input.svelte';
	import TextArea from '$lib/components/TextArea.svelte';
	import Select from '$lib/components/Select.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import type { InputType } from '$lib/types/InputType';
	import Icon from '@iconify/svelte';
	import { writeCommit } from '$lib/utils';

	let inputs:Array<InputType> = [
		{
			type: 'INPUT',
			model: '',
			error: '',
			optional: false,
			label: 'Task Name',
			placeholder: 'Enter task name...'
		},
		{
			type: 'TEXT-AREA',
			model: '',
			error: '',
			optional: true,
			label: 'Distribution',
			placeholder: 'Enter distribution...'
		},
		{
			type: 'SELECT',
			model: '',
			error: '',
			optional: false,
			label: 'Status',
			placeholder: 'Select status...',
			options: statuses
		},
		{
			type: 'SELECT',
			model: '',
			error: '',
			optional: false,
			label: 'Tag',
			placeholder: 'Select tag...',
			options: tags
		},
		{
			type: 'SELECT',
			model: '',
			error: '',
			optional: false,
			label: 'Priority',
			placeholder: 'Select priority...',
			options: priorities
		}
	];

	let commitName = '';
	let isDialogOpen = false;
	let detectedDialog = false;
	let copiedMessage = false;
	$: {
		if (copiedMessage === true) {
			let timeOut: number;
			timeOut = setTimeout(() => {
				copiedMessage = false;
				clearTimeout(timeOut);
			}, 1400);
		}
	}
	let copiedId = '';
	let copiedData: Array<string> = [];

	const submitHandler = () => {
		let status = false;
		inputs = inputs.map((input) => {
			input.error = '';
			if (!input.model && !input.optional) {
				input.error = 'Required';
				status = true;
			}
			return input;
		});
		if (status) return;
		isDialogOpen = true;
		commitName = writeCommit(copiedId, inputs);
	};

	const copyToClipBoard = () => {
		navigator.clipboard.writeText(commitName);
		isDialogOpen = false;
		copiedMessage = true;
		resetInputs();
	};

	const resetInputs = () => {
		copiedId = '';
		copiedData = [];
		inputs.forEach((_, i) => {
			inputs[i].model = '';
		});
	};

	const handleCopiedData = () => {
		detectedDialog = false;
		if (navigator.clipboard && navigator.clipboard.readText) {
			navigator.clipboard.readText().then((t) => {
				let id = t.split('\n')[0].split(' ')[0].trim();
				let splitedCopiedData = t.substr(t.lastIndexOf("TaskName: ")+1).split('\n');

				let tempCopy = splitedCopiedData.map(sCopyData => {
					let draft = sCopyData.substr(sCopyData.indexOf('{')+1)
					return draft.substr(0, draft.lastIndexOf('}'));
				})
				
				if (commitIdRegex.test(id) && tempCopy.length === 5) {
					detectedDialog = true;
					copiedData = [id, ...tempCopy];
				}
			});
		} else {
			console.log('Clipboard API not available');}
	};

	const pasteToInputs = () => {
		copiedId = copiedData.shift() ?? '';
		copiedData.forEach((c, i) => {
			inputs[i].model = c;
		});
		detectedDialog = false;
	};

	onMount(() => {
		window.addEventListener('focus', handleCopiedData);
		return () => {
			window.removeEventListener('focus', handleCopiedData);
		};
	});
</script>

<svelte:head>
	<title>Commit Maker</title>
	<meta name="Commit Maker" content="Commit Maker provided by WAI" />
</svelte:head>

<section class="w-full flex flex-col items-center pt-3 gap-3">
	<h1 class="text-3xl font-title font-extrabold">Commit Maker</h1>
	<form
		class="flex flex-col items-center justify-center gap-3 min-w-[300px] max-w-[400px]: sm:w-[360px]"
		on:submit|preventDefault={submitHandler}
	>
		{#each inputs as input, i (i)}
			{#if input.type === 'INPUT'}
				<Input
					bind:error={input.error}
					bind:model={input.model}
					label={input.label}
					placeholder={input.placeholder}
				/>
			{:else if input.type === 'TEXT-AREA'}
				<TextArea
					bind:error={input.error}
					bind:model={input.model}
					label={input.label}
					placeholder={input.placeholder}
				/>
			{:else if input.type === 'SELECT'}
				<Select
					bind:error={input.error}
					bind:model={input.model}
					label={input.label}
					placeholder={input.placeholder}
					options={input.options}
				/>
			{/if}
		{/each}

		<button
			type="submit"
			class="neo-wrap neo-wrap-btn bg-primary px-2 w-[150px] mt-2 text-center h-9 flex justify-center items-center gap-2"
			>Generate
			<Icon icon="line-md:cog-filled-loop" font-size={22} />
		</button>
	</form>

	<Dialog
		{isDialogOpen}
		on:closeDialog={() => {
			isDialogOpen = false;
		}}
	>
		<h2 class="text-center font-semibold mb-2">✨ Your commit message is here ✨</h2>
		<div class="flex flex-col justify-center items-center">
			<p class="text-sm text-left">{commitName}</p>

			<button
				on:click={copyToClipBoard}
				class="mx-auto neo-wrap neo-wrap-btn bg-primary px-2 w-[150px] mt-2 text-center h-9 flex justify-center items-center gap-2"
				>Copy
				<Icon icon="icon-park-outline:copy" font-size={20} />
			</button>
		</div></Dialog
	>

	<Dialog
		isDialogOpen={detectedDialog && !copiedId}
		on:closeDialog={() => {
			detectedDialog = false;
		}}
	>
		<h2 class="text-center font-semibold mb-1">We detected you have updatable commit message 🔎</h2>
		<div class="text-center font-semibold mb-1">Do you want to paste & update?</div>
		<button
			on:click={() => pasteToInputs()}
			class="mx-auto neo-wrap neo-wrap-btn bg-primary px-2 w-[150px] mt-2 text-center h-9 flex justify-center items-center gap-2"
			>Paste
			<Icon icon="fluent:clipboard-paste-16-regular" font-size={20} />
		</button>
	</Dialog>

	{#if copiedMessage}
		<div
			transition:fly={{ x: 288, duration: 288 }}
			class="fixed bottom-[3%] right-[2%] p-2 rounded-md neo-wrap bg-[#e3fdec] text-sm w-[240px] flex justify-between items-center"
		>
			<span>Commit Message Copied!</span>
			<button on:click={() => (copiedMessage = false)}>
				<Icon icon="jam:close" class="text-error" font-size={18} />
			</button>
		</div>
	{/if}
</section>
<footer class="text-sm text-center text-border mt-auto p-1">
	Provided by <a class="font-medium underline" href="https://github.com/wyMinLwin/"
		>Wai Yan Min Lwin</a
	>
</footer>
