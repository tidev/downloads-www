export interface Asset {
	os: string,
	size: number,
	url: string
}

export interface BuildInfo {
	name: string,
	version: string,
	date: string,
	expires?: string,
	url: string,
	assets: Asset[]
}

export interface BranchInfo {
	[branch: string]: string
}
