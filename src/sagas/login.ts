// tslint:disable
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { Actions } from '../actions'

export default function * watchConnects () {
	yield takeEvery('LOGIN', login)
}

function* login (action: typeof Actions.login) {
}
