import React, { Component } from "react";
import { Form, Input, Select } from "antd";
import PropTypes from "prop-types";
const { Option } = Select;
class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {
    //对父亲传递过来的数据进行校验
    categorys: PropTypes.array.isRequired,
    parentId: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired,
  };
  componentWillMount() {
    // 通过这句话可以把form对象传递给父组件
    this.props.setForm(this.props.form);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { categorys, parentId } = this.props;
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator("parentId", {
            initialValue: parentId,
          })(
            <Select>
              <Option value="0">一级分类</Option>
              {categorys.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("categoryName", {
            initialValue: "",
          })(<Input type="text" />)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(AddForm);
