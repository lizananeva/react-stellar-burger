import { fakeWsData, fakeError } from '../../utils/fake-data';
import {
  feedReducer,
  initialState,
  setWebsocketOpen,
  setWebsocketClose,
  setWebsocketConnect,
  setWebsocketDisconnect,
  setWebsocketData,
  setWebsocketError
} from './feed-slice';

describe('Test orders feed reducer', () => {
  test('Return initial state', () => {
    expect(feedReducer(undefined, { type: undefined }))
    .toEqual(initialState)
  })
  test('Open websocket connection', () => {
    expect(feedReducer(initialState, setWebsocketOpen(true)))
    .toEqual({ ...initialState, wsOpen: true, wsError: null })
  })
  test('Close websocket connection', () => {
    expect(feedReducer(initialState, setWebsocketClose()))
    .toEqual(initialState)
  })
  test('Websocket connect', () => {
    expect(feedReducer(initialState, setWebsocketConnect('url')))
    .toEqual({ ...initialState, wsConnect: true, wsUrl: 'url' })
  })
  test('Websocket disconnect', () => {
    expect(feedReducer(initialState, setWebsocketDisconnect()))
    .toEqual({ ...initialState, wsConnect: false })
  })
  test('Websocket get orders data', () => {
    expect(feedReducer(initialState, setWebsocketData(fakeWsData)))
    .toEqual({ ...initialState, orders: fakeWsData })
  })
  test('Websocket connection failed ', () => {
    expect(feedReducer(initialState, setWebsocketError('Some websocket error')))
    .toEqual({ ...initialState, wsError: 'Some websocket error' })
  })
  test('Successful orders data fetch', () => {
    expect(
      feedReducer(initialState, { type: 'feed/fetch/fulfilled', payload: fakeWsData }))
      .toEqual({ ...initialState, orders: fakeWsData })
  })
  test('Failed to fetch orders data', () => {
    expect(
      feedReducer(initialState, { type: 'feed/fetch/rejected', error: fakeError }))
      .toEqual(initialState)
  })
})
