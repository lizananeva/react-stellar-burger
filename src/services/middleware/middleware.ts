import { Middleware } from 'redux';
import { RootStore } from '../store';
import { TwsActions } from '../types';

export const socketMiddleware = (wsActions: TwsActions): Middleware<{}, RootStore> => {
  return store => {
    let socket: WebSocket | null = null;
    let url = '';

    return next => action => {
      const { dispatch } = store;
      const { wsConnect, wsDisconnect, wsOpen, wsError, wsMessage, wsClose } = wsActions;

      if (action.type === wsConnect) {
        url = action.payload;
        socket = new WebSocket(`${url}`);
      }

      if (action.type === wsDisconnect) {
        if (socket) {
            socket.close(1000, `Websocket closed`)
            socket = null;
        }
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: wsOpen });
        }

        socket.onerror = error => {
          dispatch({ type: wsError });
        }

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: wsMessage, payload: parsedData });
        }

        socket.onclose = event => {
          dispatch({ type: wsClose, payload: event.code.toString() });
        }
      }

      next(action);
    }
  }
}
