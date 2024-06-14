import type { InputType } from './types/InputType';

const writeCommit = (copiedId: string, inputs: Array<InputType>) => {
	return `${copiedId}${
		copiedId ? '\n*If want revise keep fill , if not can remove fil*\n' : ''
	}TaskName: {${inputs[0].model}}\nDistribution: {${inputs[1].model}}\nStatus: {${
		inputs[2].model
	}}\nTag: {${inputs[3].model}}\nPriority: {${inputs[4].model}}`;
};

export { writeCommit };
