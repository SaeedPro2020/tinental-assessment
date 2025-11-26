// Lightweight runtime utilities used by UI components.
// Originally we had a TS file re-export; that was removed during cleanup.
// Provide a small `cn` helper (classnames-like) so components keep working.

/**
 * Concatenate class names. Accepts strings, arrays, and objects.
 * Example: cn('a', { b: true, c: false }, ['d', 'e']) => 'a b d e'
 */
/**
 * @param {...any[]} inputs
 * @returns {string}
 */
export function cn(...inputs) {
	const classes = [];
	for (const input of inputs) {
		if (!input) continue;
		if (typeof input === 'string') {
			classes.push(input);
		} else if (Array.isArray(input)) {
			classes.push(cn(...input));
		} else if (typeof input === 'object') {
			for (const [key, value] of Object.entries(input)) {
				if (value) classes.push(key);
			}
		}
	}
	return classes.filter(Boolean).join(' ');
}

// Export a no-op helper for any runtime needs; Type-only helpers used in TS
// imports (like `type WithElementRef`) are removed at compile time and don't
// need runtime exports.

