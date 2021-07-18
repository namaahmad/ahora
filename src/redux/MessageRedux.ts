import { combineReducers } from 'redux';
export const ACTION_SET_MESSAGE = 'SET_MESSAGE';
export interface ChatMessageInterface {
    channelId: number,
    eventName: number,
    id?: number,
    DeviceSerial?: string,
    LogTime?: string,
    LogDate?: string,
    LatLocation?: number,
    LngLocation?: number,
    SpeedLog?: number,
    sendMessage?:boolean,
}
export interface ActionInterface {
    msg: ChatMessageInterface,
    type: string
}
const WsMessage = (state: ChatMessageInterface = { channelId: -1, eventName: 0 }, action: ActionInterface) => {

    switch (action.type) {
        case ACTION_SET_MESSAGE:
            state = action.msg;
            return action.msg;
        default:
            return state
    }
}
export const getAdminWebSocketMessage = (state: any) => state.WsMessage;
export default combineReducers({
    WsMessage
});
