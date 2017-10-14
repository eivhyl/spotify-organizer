import { Modal } from '../types'
import { createAction } from './actionCreator'

const ModalActions = {
	registerModal: createAction<'MODAL_REGISTER', Modal['id']>('MODAL_REGISTER'),
	unregisterModal: createAction<'MODAL_UNREGISTER', Modal['id']>('MODAL_UNREGISTER'),
	changeModal: createAction<'MODAL_CHANGE', Modal['open'], Modal['id']>('MODAL_CHANGE')
}

export default ModalActions
