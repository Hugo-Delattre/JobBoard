export type RemoteColumn = {
	Field: string;
	Type: string;
	Null: "YES" | "NO";
	Key: string;
	Default: string | null;
	Extra: string;
};

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
