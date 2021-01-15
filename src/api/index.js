import ajax from "./ajax";

//登陆
export const reqLogin = (username, password) =>
  ajax("/login", { username, password }, "POST");

// 获取分类
export const reqCategorys = (parentId) =>
  ajax("/manage/category/list", { parentId });

//删除
export const reqDel = (id) => ajax("/manage/category/del", { id }, "POST");

// 更新分类
export const reqUpdateCategory = ({ categoryId, categoryName }) =>
  ajax("/manage/category/update", { categoryId, categoryName }, "POST");

//添加分类
export const reqAddCategory = (parentId, categoryName) =>
  ajax("/manage/category/add", { parentId, categoryName }, "POST");

//更新商品
export const reqUpdateProduct = (parentId, categoryName) =>
  ajax("/manage/product/add", { parentId, categoryName }, "POST");
