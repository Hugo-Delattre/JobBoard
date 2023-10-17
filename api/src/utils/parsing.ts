/* eslint-disable prettier/prettier */
import { Column, Key, RemoteColumn } from "~/types/Database";

export const parseFieldType = (name: string, fieldType: string): string | null => {
	switch (name) {
		case "firstname" || "lastname":
			return "input:text";
		case "email":
			return "input:email";
		case "password":
			return "input:password";
		case "company":
			return "select:company";
		case "profilePicture" || "resume":
			return "select:upload";
		case "gender" || "role":
			return `enum:${JSON.parse(`[${fieldType.replaceAll("'", "\"").split("(")[1].replace(")", "")}]`)}`;
		default:
			return "input:text";
	}
};

const parseKey = (table: string, key: string): Key => {
	switch (key) {
		case "PRI":
			return { type: "primary" };
		case "MUL":
			return { type: "foreign", to: table };
		case "UNI":
			return { type: "unique" };
		default:
			return null;
	}
};

export const parseColumn = (data: RemoteColumn): Column => {
	const name = data.Field;
	const type = parseFieldType(data.Field, data.Type);
	const required = data.Null === "NO";
	const defaultValue = data.Default || "";
	const key = parseKey(name, data.Key);
	const extra = data.Extra;

	return {
		name,
		type,
		required,
		key,
		default: defaultValue,
		extra,
	};
};
