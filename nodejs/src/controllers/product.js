import dotenv from 'dotenv';
import joi from 'joi';
import Product from '../models/product';
import Category from '../models/category';

dotenv.config();
const { API_URI } = process.env;

const productSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
  image: joi.string().required(),
  desc: joi.string().required(),
  categoryId: joi.string().required(),
});

export const getAll = async (req, res) => {
  const { _page = 1, _limit = 10, _sort = "createdAt", _order = "asc", _expand } = req.query;
  const options = {
      page: _page,
      limit: _limit,
      sort: { [_sort]: _order === "desc" ? -1 : 1 },
  };
  const populateOptions = _expand !== undefined ? [{ path: "categoryId"}] : [];
  try {
      const result = await Product.paginate({ }, { ...options, populate: populateOptions }) 
       
      if (result.docs.length === 0) throw new Error("No products found");
      const response = {
          data: result.docs,
          pagination: {
              currentPage: result.page,
              totalPages: result.totalPages,
              totalItems: result.totalDocs,
          },
      };
      return res.status(200).json(response);
  } catch (error) {
      return res.status(400).json({ message: error.message });
  }
};
export const get = async function (req, res) {
  try {
    // const { data: product } = await axios.get(`${API_URI}/products/${req.params.id}`);
    const product = await Product.findById(req.params.id).populate(
      'categoryId'
    );
    if (!product) {
      return res.json({
        message: 'Không có sản phẩm nào',
      });
    }
    return res.json(product);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const create = async function (req, res) {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    // const { data: product } = await axios.post(`${API_URI}/products`, req.body);
    const product = await Product.create(req.body);
    if (!product) {
      return res.json({
        message: 'Không thêm sản phẩm',
      });
    }
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id,
      },
    });
    return res.json({
      message: 'Thêm sản phẩm thành công',
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const update = async function (req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.json({
        message: 'Cập nhật sản phẩm không thành công',
      });
    }
    return res.json({
      message: 'Cập nhật sản phẩm thành công',
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const remove = async function (req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.json({
      message: 'Xóa sản phẩm thành công',
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
