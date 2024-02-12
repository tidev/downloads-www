import type { BuildInfo } from './types';

const re = /^(\d+)\.(\d+)\.(\d+)\.(\w+)$/;
export const types = [ 'beta', 'rc', 'ga' ];

export function sortLatest(a: BuildInfo, b: BuildInfo) {
	return new Date(b.date).getTime() - new Date(a.date).getTime()
}
