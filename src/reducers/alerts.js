import _ from 'lodash';
import { ENQUEUE_ALERT } from '../actions/alerts/enqueue.js';
import { DEQUEUE_ALERT } from '../actions/alerts/dequeue.js';

export const initialState = [];

export const alerts = (state=initialState, action) => {
	let newState = _.merge([], state);
	switch (action.type) {
		case ENQUEUE_ALERT:
			{
				newState.push(action.payload.alert);
				return newState;
			}
		case DEQUEUE_ALERT:
			{
				newState.shift();
				return newState;
			}
	}
	return state;
};