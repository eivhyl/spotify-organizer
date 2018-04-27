import * as React from 'react'
import { Playlist, Sort, User } from '../types'
export function getNextSortMode (isOwn: boolean, order: Sort): Sort {
	if (!isOwn)
		return Sort.Desc

	switch (order) {
		case Sort.Asc:
			return Sort.None
		case Sort.Desc:
			return Sort.Asc
		case Sort.None:
			return Sort.Desc
	}
}

export function getSortIcon (isOwn: boolean, order: Sort) {
	if (!isOwn)
		return null

	switch (order) {
		case Sort.Asc:
			return <i className="fa fa-sort-amount-asc" aria-hidden="true" />
		case Sort.Desc:
			return <i className="fa fa-sort-amount-desc" aria-hidden="true" />
		default:
			return null
	}
}

export function canModifyPlaylist (playlist: Playlist, user: User) {
	return playlist.collaborative || playlist.owner.id === user.name
}
