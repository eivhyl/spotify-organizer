import { call, put, select, takeLatest } from 'redux-saga/effects'
import { State } from '../reducers/index'
import { sleep } from '../utils/sleep'
import spotifyApi from './spotifyFetch'

import { Actions } from '../actions'
import { Playlist, Track } from '../types'

export default function* () {
	yield takeLatest<typeof Actions.fetchPlaylists>(Actions.fetchPlaylists.type, getPlaylists),
	yield takeLatest<typeof Actions.fetchTracks>(Actions.fetchTracks.type, getTracks)
}

function* getPlaylists () {
	let playlists: SpotifyApi.ListOfCurrentUsersPlaylistsResponse['items'] = []
	let response: SpotifyApi.ListOfCurrentUsersPlaylistsResponse
	const limit = 50
	let offset = 0
	do {
		response = yield call(spotifyApi, `me/playlists?offset=${offset}&limit=${limit}`)
		playlists = playlists.concat(response.items)
		offset += limit
	} while (response.next !== null)
	yield put(Actions.playlistsFetched(playlists))
}

function* getTracks (action: typeof Actions.fetchTracks) {
	const { owner, id } = action.payload
	let tracks: Track[] = []
	let response: SpotifyApi.PlaylistTrackResponse
	const limit = 100
	let offset = 0
	do {
		response = yield call(spotifyApi, `users/${owner}/playlists/${id}/tracks?offset=${offset}&limit=${limit}`)
		const mappedTracks = response.items.map<Track>(t => ({
			id: t.track.id,
			name: t.track.name,
			artists: t.track.artists.map(artist => ({
				id: artist.id,
				name: artist.name
			})),
			album: {
				id: t.track.album.id,
				name: t.track.album.name
			},
			duration_ms: t.track.duration_ms,
			meta: {
				added_at: t.added_at,
				added_by: t.added_by,
				is_local: t.is_local
			}
		}))
		tracks = tracks.concat(mappedTracks)
		offset += limit
		yield put(Actions.fetchTracksProgress(tracks.length, id))
	} while (response.next !== null)

	function* waitForPlaylists (): IterableIterator<any> {
		const playlist: Playlist = yield select<State>(s => s.playlists.find(p => p.id === id))
		if (playlist)
			return
		yield call(sleep, 50)
		yield call(waitForPlaylists)
	}

	yield call(waitForPlaylists)
	yield put(Actions.tracksFetched(tracks, id))
}
