import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import filters from './filters'
import modals from './modals'
import playlists from './playlists'
import timer from './timer'
import user from './user'

export type State = ReturnType<typeof reducers>

const reducers = combineReducers({
	filters,
	modals,
	playlists,
	routing,
	timer,
	user
})

export default reducers
