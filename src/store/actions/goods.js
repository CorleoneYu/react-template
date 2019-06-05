import actionType from '../action-type';

export const addGoods = ({goodsId, price, name}) => ({
  type: actionType.goods.ADD_GOODS,
  payload: {
    name,
    price,
    goodsId,
  }
})

export const deleteGoods = goodsId => ({
  type: actionType.goods.DELETE_GOODS,
  payload: {
    goodsId
  }
})