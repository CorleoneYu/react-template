import actionType from '../action-type';

export const addGoods = ({id, price, name}) => ({
  type: actionType.goods.ADD_GOODS,
  payload: {
    name,
    price,
    id,
  }
})

export const deleteGoods = id => ({
  type: actionType.goods.DELETE_GOODS,
  payload: {
    id,
  }
})