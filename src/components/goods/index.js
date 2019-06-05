import { connect } from 'react-redux';
import { addGoods, deleteGoods } from 'actions/goods';
import Goods from './Goods';

const mapStateToProps = state => ({
  goods: state.goods
});

const mapDispatchToProps = dispatch => ({
  addGoods: (goods) => dispatch(addGoods(goods)),
  deleteGoods: (goodsId) => dispatch(deleteGoods(goodsId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Goods);