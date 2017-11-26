
export interface Tuple<T1, T2> extends Array<any> {
	[0]: T1
	[1]: T2
}


export type User = {
	name: string
	image: string | null
	token: string
}

export * from './filters'
export * from './modal'
export * from './scopes'
export * from './spotify'
