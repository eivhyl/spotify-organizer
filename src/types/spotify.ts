export interface Playlist extends SpotifyApi.PlaylistObjectSimplified {
	selected: boolean
	tracks: SpotifyApi.PlaylistObjectSimplified['tracks'] & { items?: Track[] }
}

export type TrackMeta = {
	added_at: SpotifyApi.PlaylistTrackObject['added_at'],
	added_by: SpotifyApi.PlaylistTrackObject['added_by'],
	is_local: SpotifyApi.PlaylistTrackObject['is_local']
}

export interface Track extends SpotifyApi.TrackObjectFull {
	meta: TrackMeta
}
