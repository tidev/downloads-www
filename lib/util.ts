import type { BuildInfo } from './types';

const re = /^(\d+)\.(\d+)\.(\d+)\.(\w+)$/;
export const types = [ 'beta', 'rc', 'ga' ];

export function sortLatest(a: BuildInfo, b: BuildInfo) {
	const [ _, amajor, aminor, apatch, atag ] = a.name.toLowerCase().match(re);
	const [ __, bmajor, bminor, bpatch, btag ] = b.name.toLowerCase().match(re);
	
	let n = parseInt(bmajor) - parseInt(amajor);
	if (n !== 0) {
		return n;
	}

	n = parseInt(bminor) - parseInt(aminor);
	if (n !== 0) {
		return n;
	}

	n = parseInt(bpatch) - parseInt(apatch);
	if (n !== 0) {
		return n;
	}

	return types.indexOf(btag) - types.indexOf(atag);
}
