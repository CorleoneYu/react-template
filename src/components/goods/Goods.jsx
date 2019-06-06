import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Button } from "antd";
const { Column } = Table;

let idx = 1;
let name = `商品${idx}`;
let price = 100;

class Goods extends Component {
  addGoods = () => {
    const { addGoods } = this.props;
    addGoods({
      name,
      price,
      id: idx++
    });
    price++;
  };

  deleteGoods = id => {
    const { deleteGoods } = this.props;
    deleteGoods(id);
  };

  render() {
    const { goods } = this.props;
    return (
      <div>
        <Button onClick={this.addGoods}>添加商品</Button>
        <Table dataSource={goods} rowKey="id">
          <Column title="商品编号" dataIndex="id" key="id" />
          <Column title="商品名" dataIndex="name" key="name" />
          <Column title="价格" dataIndex="price" key="price" />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Button type="danger" onClick={() => this.deleteGoods(record.id)}>
                删除
              </Button>
            )}
          />
        </Table>
      </div>
    );
  }
}

export default Goods;
