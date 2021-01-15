import React, { Component } from "react";
import { Card, Button, Icon, Table, Modal } from "antd";
import {
  reqCategorys,
  reqUpdateCategory,
  reqAddCategory,
  reqDel,
} from "../../../api";
import UpdateForm from "./Add/update-form";
import AddForm from "./Add/add";
const { confirm } = Modal;

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorys: [], //获取一级分类列表
      loading: false,
      parentId: "0", //夫分类id
      subcategorys: [], //二级分类
      parentName: "", //一级分类名称
    };
  }
  initColumns = () => {
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name",
      },
      {
        title: "操作",
        render: (category) => (
          <span>
            {this.state.parentId === "0" ? (
              <Button onClick={() => this.showSubCategorys(category)}>
                查看子分类
              </Button>
            ) : null}

            <Button
              type="primary"
              onClick={() => this.showUpdateModal(category)}
            >
              修改分类
            </Button>
            <Button type="danger" onClick={() => this.del(category)}>
              删除分类
            </Button>
          </span>
        ),
      },
    ];
  };
  componentWillMount() {
    this.initColumns();
  }
  componentDidMount() {
    this.getCategorys();
  }
  // 获取分类列表---同时获取一级和二级分类
  getCategorys = async (parentId) => {
    // const { parentId } = this.state;
    parentId = parentId || this.state.parentId;
    this.setState({ loading: true });
    const result = await reqCategorys(parentId);
    this.setState({ loading: false });
    if (result.status === 0) {
      const categorys = result.data;
      console.log(1111, categorys);
      // 如果parentId===0的时候，说明是一级分类
      if (parentId === "0") {
        this.setState({
          categorys,
        });
      } else {
        this.setState({
          subcategorys: categorys,
        });
      }
    }
  };
  // 获取二级分类
  showSubCategorys = (category) => {
    this.setState(
      {
        parentId: category._id, //设置了parentId，但是没有调用
        parentName: category.name,
      },
      () => {
        this.getCategorys();
      }
    );
  };
  // 显示一级分类
  // 把parentId变成0，同时清空subCategorys
  showCategorys = () => {
    this.setState({
      parentId: "0",
      subcategorys: [],
      parentName: "",
      visible: "", //用于控制弹框的显示0隐藏  1 添加  2  修改
    });
  };
  // 显示添加弹框
  showAddModal = () => {
    this.setState({
      visible: 1,
    });
  };
  // 点击取消
  handleCancel = () => {
    this.setState({
      visible: 0,
    });
  };

  // 显示修改弹框
  showUpdateModal = (category) => {
    console.log(1111, category);
    this.category = category;
    this.setState({
      visible: 2,
    });
  };
  // 修改数据
  updateCategory = async () => {
    // 关闭弹框
    this.setState({
      visible: 0,
    });
    // 获取表单数据
    const { categoryName } = this.form.getFieldsValue();
    const categoryId = this.category._id;
    // 清除输入数据
    this.form.resetFields();
    const result = await reqUpdateCategory({ categoryId, categoryName });
    if (result.status === 0) {
      this.getCategorys();
    }
  };

  // 添加分类
  addCategory = async () => {
    // 关闭弹框
    this.setState({
      visible: 0,
    });
    const { parentId, categoryName } = this.form.getFieldsValue();
    // 清除输入数据
    this.form.resetFields();
    const result = await reqAddCategory(parentId, categoryName);
    if (result.status === 0) {
      // 添加的分类就是当前分类列表下的分类
      if (parentId === this.state.parentId) {
        // 重新获取当前分类列表显示
        this.getCategorys();
      } else if (parentId === "0") {
        // 在二级分类列表下添加一级分类, 重新获取一级分类列表, 但不需要显示一级列表
        this.getCategorys("0");
      }
    }
  };

  //删除
  del = (category) => {
    confirm({
      title: "你确定要删除吗?",
      // content: "Some descriptions",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        // console.log(category);
        reqDel(category._id);
        this.getCategorys();
      },
      onCancel() {},
    });
  };
  render() {
    const {
      categorys,
      loading,
      subcategorys,
      parentId,
      parentName,
    } = this.state;
    const categoryName = this.category || {};
    const title =
      this.state.parentId === "0" ? (
        <span style={{ color: "red", cursor: "pointer" }}>一级分类列表</span>
      ) : (
        <span>
          <span
            onClick={this.showCategorys}
            style={{ color: "red", cursor: "pointer" }}
          >
            一级分类列表
          </span>
          <span>---</span>
          <span>{parentName}</span>
        </span>
      );
    const extra = (
      <Button type="primary" onClick={this.showAddModal}>
        <Icon type="plus" />
        添加
      </Button>
    );

    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey="_id"
          loading={loading}
          dataSource={parentId === "0" ? categorys : subcategorys}
          columns={this.columns}
          pagination={{
            defaultCurrent: 1,
            defaultPageSize: 5,
          }}
        />
        <Modal
          title="添加分类"
          visible={this.state.visible === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
          okText="添加"
          cancelText="取消"
        >
          <AddForm
            categorys={categorys}
            parentId={parentId}
            setForm={(form) => {
              this.form = form;
            }}
          />
        </Modal>
        <Modal
          title="修改分类"
          visible={this.state.visible === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            categoryName={categoryName.name}
            setForm={(form) => {
              this.form = form;
            }}
          />
        </Modal>
      </Card>
    );
  }
}

export default Category;
