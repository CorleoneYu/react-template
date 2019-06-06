import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Button } from "antd";
const { Column } = Table;

let idx = 1;
let name = `用户${idx}`;
let age = 16;

class User extends Component {
  addUser = () => {
    const { addUser } = this.props;
    addUser({
      name,
      age,
      id: idx++
    });
    age++;
  };

  deleteUser = id => {
    const { deleteUser } = this.props;
    deleteUser(id);
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <Button onClick={this.addUser}>添加用户</Button>
        <Table dataSource={user} rowKey="id">
          <Column title="用户编号" dataIndex="id" key="id" />
          <Column title="用户名" dataIndex="name" key="name" />
          <Column title="年龄" dataIndex="age" key="age" />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Button type="danger" onClick={() => this.deleteUser(record.id)}>
                删除
              </Button>
            )}
          />
        </Table>
      </div>
    );
  }
}

export default User;
