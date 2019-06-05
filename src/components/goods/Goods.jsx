import React, {Component} from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types'
import { Table, Button } from 'antd';

let idx = 1;
let name = `商品${idx}`;
let price = 100;

const columns = [
  {
    title: '编号',
    dataIndex: 'goodsId',
    key: 'goodsId',
  },
  {
    title: '商品名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '操作',
    key: 'action',
    render: (text) => {
      return (
        <Button type='danger'>删除</Button>
      )
    },
  },
];

class Goods extends Component {
  addGoods = () => {
    const { addGoods } = this.props;
    addGoods({
      name,
      price,
      goodsId: idx++
    });
    price++;
  }

  deleteGoods = (e, goodsId) => {
    const { deleteGoods } = this.props;
    deleteGoods(goodsId)
  }

  render() {
    const { goods } = this.props;
    console.log(goods);
    return (
      <div>
        <Button onClick={this.addGoods}>添加商品</Button>
        <Table dataSource={goods} columns={columns} rowKey="goodsId" />;
      </div>
    )
  }
}

export default Goods;