export function isNonEmptyString(value: unknown): value is string {
	return typeof value === 'string' && value.trim().length > 0;
}

export function isPositiveNumber(value: unknown): value is number {
	return typeof value === 'number' && value > 0;
}

export function isValidClass(value: unknown): value is string {
	// Example format: "3A", "5B"
	return typeof value === 'string' && /^[1-9][A-Z]$/i.test(value.trim());
}
