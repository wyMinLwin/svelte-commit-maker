type InputType = {
	type: string;
	model: string;
	error: string;
	optional: boolean;
	label: string;
	placeholder: string;
	options?: {
		value: string;
		text: string;
	}[];
};
export type { InputType }; 