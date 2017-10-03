import * as React from 'react'
import { connect } from 'react-redux'
import { returntypeof } from 'react-redux-typescript'
import Playlists from '../components/Playlists'
import Settings from './Settings'

import * as _ from 'lodash'

import { Actions } from '../actions'
import Button from '../components/Button'
import Input from '../components/Input'
import { State } from '../reducers'
import { compareByKey } from '../utils'

import '../styles/playlists.pcss'

const mapStateToProps = (state: State) => ({
	playlists: state.playlists,
	filters: state.filters.playlists
})

const dispatchToProps = {
	selectAll: Actions.selectPlaylists,
	select: Actions.selectPlaylist,
	changeSortMode: Actions.updatePlaylistsSort,
	updateFilterText: Actions.updateFilterText
}

const stateProps = returntypeof(mapStateToProps)

type Props = typeof stateProps & typeof dispatchToProps

const PlaylistsManager: React.StatelessComponent<Props> = (props) => {
	const { filters, select, selectAll, changeSortMode, updateFilterText } = props
	const { order } = filters
	const playlists = filters.order !== null
		? props.playlists
			.slice()
			.filter(p => _.includes(p.name, filters.text) || _.includes(p.owner.display_name, filters.text))
			.sort((a, b) => compareByKey(a, b, order.key, !order.asc))
		: props.playlists
	return (
		<div className="playlists">
			<div className="header">
				<h1>Playlists</h1>
				<Input type="text" placeholder="&#xF002; Filter" onChange={(e: any) => updateFilterText(e.target.value)} />
				<Settings />
			</div>
			<Button primary>Remove duplicates</Button>
			<ul className="stats right-menu">
				<li>{playlists.length} Playlists</li>
				<li>{playlists.reduce((a, b) => a + b.tracks.total, 0)} Tracks</li>
			</ul>
			<hr />
			<Playlists
				changeSortMode={changeSortMode}
				filters={filters}
				select={select}
				selectAll={selectAll}
				playlists={playlists}
			/>
		</div>
	)
}


export default connect(
	mapStateToProps,
	dispatchToProps
)(PlaylistsManager)
