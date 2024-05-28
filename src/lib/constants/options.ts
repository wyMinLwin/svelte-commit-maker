const statuses = [
	{
		value: 'NS',
		text: 'Not Start'
	},
	{
		value: 'IP',
		text: 'In Progress'
	},
	{
		value: 'CP',
		text: 'Completed'
	}
];

const tags = [
	{
		value: 'CF',
		text: 'Core Function'
	},
	{
		value: 'FE',
		text: 'Feature'
	},
	{
		value: 'IS',
		text: 'Issue'
	},
	{
		value: 'CR',
		text: 'Customer Request'
	},
	{
		value: 'LR',
		text: 'Learning'
	},
	{
		value: 'PR',
		text: 'Performance'
	},
	{
		value: 'OT',
		text: 'Others'
	}
];

const priorities = [
	{
		value: 'L',
		text: 'Low'
	},
	{
		value: 'M',
		text: 'Medium'
	},
	{
		value: 'H',
		text: 'High'
	}
];

type OptionType = {
	value: string;
	text: string;
};

export { statuses, tags, priorities };
export type { OptionType };
