import React from "react";
import { Card, Button, Icon, Table } from "antd";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AddProduct = () => {
  return (
    <Card title={"添加商品"}>
      <Table></Table>
    </Card>
  );
};
export default AddProduct;
