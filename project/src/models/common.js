import { getSeller, getGoods } from "../services/common";
export default {
  namespace: 'common',
  state: {
    seller: [],
    goods: [],
    selectFoods: [],
    test: 'test',
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname }) => {
      });
    },
  },
  effects: {
    *getSeller({ payload }, { call, put }) {
      const res = yield call(getSeller);
      const { code, data } = res;
      if (code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            seller: data
          }
        })
      }
    },
    *getGoods({ payload }, { call, put }) {
      const res = yield call(getGoods);
      const { code, data } = res;
      data.forEach(item => {
        item.foods.forEach(food => {
          food.count = 0;
        });
      });
      if (code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            goods: data
          }
        })
      }
    },
  },
  reducers: {
    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
