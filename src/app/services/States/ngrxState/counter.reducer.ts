/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import { createReducer, on } from '@ngrx/store';
import {
  increment, decrement, reset, save,
} from './counter.actions';

export const initialState: string = '';

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => (parseInt(state, 10) - 1).toString()),
  on(reset, (state) => '0'),
  on(save, (state, { tokenId }) => tokenId),
);

export function counterReducer(state:any, action:any) {
  return _counterReducer(state, action);
}
