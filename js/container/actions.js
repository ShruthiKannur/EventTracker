import React from 'react';
import { availableEvents } from '../metaData/eventData.js';
import { writeTrackedEvents } from '../services/dbService.js';

const initialState = {
  userName: '',
  availableEvents,
  trackedEvents: {}
};

const handlers = {
  ['USERNAME'] : (state, payload) => {
    return {
      ...state,
      userName: payload,
    }
  },
  ['TRACKED_EVENTS'] : (state, payload) => {
    return {
      ...state,
      trackedEvents: {...state.trackedEvents, [payload.id]: payload}
    }
  },
  ['REMOVE_EVENT'] : (state, payload) => {
    const copyState = {...state.trackedEvents};
    delete copyState[payload];
    writeTrackedEvents(state.userName, Object.keys(copyState));
    return {
      ...state,
      trackedEvents: {...copyState}
    }
  },
  ['INITIALISE_TRACKED_EVENTS'] : (state, payload = []) => {
    return {
      ...state,
      trackedEvents: [...payload]
    }
  }
};

export default function(state = initialState, action) {
  const reducer = handlers && handlers[action.type];
  if (reducer)
    return reducer(state, action.payload);
  return state; //default case
}
