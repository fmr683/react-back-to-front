import { NOTIFY_USER} from '../actions/types';

const intitialState = {
    message: null,
    messageType: null
}

export default function(state = intitialState, action) {
    switch(action.type) {
        case NOTIFY_USER:
            return {
                ...state,
                message: action.message,
                messageType: action.messageType
            }
        default:
            return state;
    }
}