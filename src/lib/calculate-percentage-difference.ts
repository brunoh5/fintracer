/**
 *
 * @param value1
 * @param value2
 * @returns the diference in percentage
 * @example 7200, 1200 diff is 500%
 */

export function calculatePercentageDifference(
	value1: number,
	value2: number,
): number {
	if (value1 === 0) {
		return 0
	}
	const difference = value2 - value1
	const percentage = (difference / value1) * 100

	return Math.floor(percentage) ?? 0
}
