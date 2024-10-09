const EMAIL_REGEX =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

export const validators = {
	validEmail: (value: string) =>
		EMAIL_REGEX.test(value) || !value ? false : 'Invalid email address',
	requiredAndNoWhiteSpace: ({
		value,
		entity,
	}: {
		value: string;
		entity: string;
	}) => (value && value.trim().length !== 0 ? false : `${entity} is required`),
	minLength: ({
		value,
		min,
		entity,
	}: {
		value: string;
		min: number;
		entity: string;
	}) =>
		min <= value.trim().length
			? false
			: `${entity} should be a minimum of ${min} characters`,
	maxLength: ({
		value,
		max,
		entity,
	}: {
		value: string;
		max: number;
		entity: string;
	}) =>
		max >= value.trim().length
			? false
			: `${entity} should be a maximum of ${max} characters`,
};
