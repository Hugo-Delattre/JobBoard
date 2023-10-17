export type Column = {
	name: string;
	type?: string | null;
	required?: boolean;
	default?: string | null;
	extra?: string;
	key?: Key;
};

export type Key =
	| { type: "primary" }
	| { type: "foreign"; to: string }
	| { type: "unique" }
	| null;
