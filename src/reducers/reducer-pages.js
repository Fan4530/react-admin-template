import _ from 'lodash';

import { FLUSH_VOLUMES } from '../actions/pages/flushVolumes.js';
import { FLUSH_VOLUME } from '../actions/pages/flushVolume.js';
import { ADD_PAGE } from '../actions/pages/addPage.js';
import { ADD_RECORD } from '../actions/pages/addRecord.js';
import { REMOVE_RECORD } from '../actions/pages/removeRecord.js';
import { CLONE_VOLUMES } from '../actions/pages/cloneVolumes.js';

export const initialState = {
};

export const pages = (state = initialState, action) => {
    let newState = _.merge({}, state);
    switch (action.type) {
        case ADD_PAGE:
            {
                const { id, volume, records, pageSize } = action.payload;

                if (!records.length) return newState;

                newState[id] = newState[id] || {};
                newState[id][volume] = newState[id][volume] || {};
                newState[id][volume].pageSize = pageSize;
                const nextPage = newState[id][volume].nextPage || 0;
                newState[id][volume].records = newState[id][volume].records || [];

                const removeFrom = newState[id][volume].records.length - (newState[id][volume].records.length % newState[id][volume].pageSize);
                newState[id][volume].records.splice(removeFrom);

                newState[id][volume].records.push(...records);

                // newState[id][volume].records = _.uniq(newState[id][volume].records);

                newState[id][volume].nextPage = (records.length < pageSize) ? nextPage : nextPage + 1;

                return newState;
            }
        case ADD_RECORD: 
            {
                const { id, volume, record, pageSize } = action.payload;

                newState[id] = newState[id] || {};
                newState[id][volume] = newState[id][volume] || {};
                newState[id][volume].pageSize = pageSize;
                newState[id][volume].nextPage = newState[id][volume].nextPage || 0;
                newState[id][volume].records = newState[id][volume].records || [];

                if ((newState[id][volume].records.length + 1) % pageSize === 0) {
                    newState[id][volume].nextPage ++;
                }

                newState[id][volume].records.unshift(record);

                return newState;
            }
        case REMOVE_RECORD:
            console.log('REMOVE RECORD');
            {
                const { id, volume, callback, pageSize } = action.payload;

                newState[id] = newState[id] || {};
                newState[id][volume] = newState[id][volume] || {};
                newState[id][volume].pageSize = pageSize;
                newState[id][volume].nextPage = newState[id][volume].nextPage || 0;
                newState[id][volume].records = newState[id][volume].records || [];

                for (let i = 0; i < newState[id][volume].records.length; i ++) {
                    const record = newState[id][volume].records[i];
                    if (callback(record)) {
                        if (newState[id][volume].records.length % pageSize === 0) {
                            newState[id][volume].nextPage --;
                        }
                        newState[id][volume].records.splice(i, 1);
                        break;
                    }
                }

                return newState;
            }
        case FLUSH_VOLUMES:
            {
                const { id } = action.payload;

                if (newState[id]) {
                    Object.keys(newState[id]).map(key => {
                        newState[id][key] = { nextPage: 0, records: [] };
                    });
                }

                return newState;
            }
        case FLUSH_VOLUME:
            {
                const { id, volume } = action.payload;

                if (newState[id] && newState[id][volume]) {
                    newState[id][volume] = { nextPage: 0, records: [] };
                }
                
                return newState;
            }
        case CLONE_VOLUMES:
            {
                const { sourceId, destinationId } = action.payload;

                if (!newState[sourceId]) {
                    return newState;
                }
                newState[destinationId] = Object.assign({}, newState[sourceId]);

                return newState;
            }
    }
    return newState;
};
