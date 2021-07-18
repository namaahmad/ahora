import { combineReducers } from 'redux';

export const SET_DIC = 'setDictionary';
export const Actions = {
    SetDictionary(data: any) {
        return { type: SET_DIC, data: data };
    }
}
const Dic = (state = {}, action: any) => {

    switch (action.type) {
        case SET_DIC:
            state = action.data;
            return state
        default:
            return state
    }
}
export const getDictionary = (state: any) => state.Dic;
export default combineReducers({
    Dic
});
