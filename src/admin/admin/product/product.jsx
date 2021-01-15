import { Card, Button, Icon, Table } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { reqUpdateProduct } from "../../../api";

const columns = [
  {
    title: "商品名称",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "图片",
    dataIndex: "img",
    key: "img",
    render: (img) => <img src={img} style={{ width: "50px" }}></img>,
  },
  {
    title: "描述",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "价格",
    key: "tags",
    dataIndex: "tags",
  },
  {
    title: "状态",
    key: "status",
    dataIndex: "status",
    render: (txt) => (
      <>
        <Button type={"danger"}>已上架</Button>
        <Button type="primary">下架</Button>
      </>
    ),
  },
  {
    title: "操作",
    key: "action",
    render: () => (
      <>
        <Button type="dashed">详情</Button>
        <Button type="primary">修改</Button>
        <Button type="danger">删除</Button>
      </>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "李呲花",
    img:
      "https://img.36krcdn.com/20210114/v2_2413ae8828e94851bc5f9eae2a925e81_img_jpg",
    address: "1111111111111",
    tags: ["nice", "developer"],
    status: "已上架",
  },
  {
    key: "2",
    name: "Jim Green",
    img:
      "https://img.36krcdn.com/20210114/v2_2413ae8828e94851bc5f9eae2a925e81_img_jpg",
    address: "222222222222",
    tags: ["loser"],
    status: "已上架",
  },
  {
    key: "3",
    name: "Joe Black",
    img:
      "https://img.36krcdn.com/20210114/v2_2413ae8828e94851bc5f9eae2a925e81_img_jpg",
    address: "33333333333333",
    tags: ["cool", "teacher"],
    status: "已上架",
  },
];
const Product = () => {
  //   useEffect(() => {
  //     getProduct();
  //   }, []);
  //   const getProduct = async () => {
  //     this.setState({ loading: true });
  //     const result = await reqUpdateProduct();
  //     this.setState({ loading: false });
  //     if (result.status === 0) {
  //       const categorys = result.data;
  //       console.log(1111, categorys);
  //     }
  //   };
  const extra = (
    <>
      <Link to="/product/addProduct">
        <Button type="primary">
          <Icon type="plus" />
          添加
        </Button>
      </Link>
    </>
  );
  return (
    <Card title={"商品列表"} extra={extra}>
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default Product;
