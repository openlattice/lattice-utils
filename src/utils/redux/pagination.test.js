/*
 * @flow
 */

import { reducer } from './pagination';

import { FILTER, PAGE, RESET } from '../../constants/redux';

describe('pagination', () => {

  test('type = FILTER', () => {
    expect(
      reducer({ page: 1, query: '', start: 0 }, { query: 'test', type: FILTER })
    ).toEqual({ page: 1, query: 'test', start: 0 });
    expect(
      reducer({ page: 8, query: 'hello', start: 16 }, { type: FILTER })
    ).toEqual({ page: 8, query: '', start: 16 });
  });

  test('type = PAGE', () => {
    expect(
      reducer({ page: 1, query: 'test', start: 0 }, { page: 8, start: 97, type: PAGE })
    ).toEqual({ page: 8, query: 'test', start: 97 });
    expect(
      reducer({ page: 2, query: 'test', start: 10 }, { type: PAGE })
    ).toEqual({ page: 1, query: 'test', start: 0 });
  });

  test('type = RESET', () => {
    expect(
      reducer({ page: 3, query: 'test', start: 20 }, { type: RESET })
    ).toEqual({ page: 1, query: '', start: 0 });
  });

});
