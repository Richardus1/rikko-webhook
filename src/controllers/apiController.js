const Product = require("../models/Product");

const addProductForm = (req, res) => {
  res.render("addProductForm");
};

const addProduct = async (req, res) => {
  const {
    code,
    productName,
    description,
    img,
    price,
    stockIni,
    stockDisp,
    variant,
  } = req.body;

  try {
    const product = new Product({
      code,
      productName,
      description,
      img,
      price,
      stockIni,
      stockDisp,
      variant,
    });
    await product.save();
    //res.send("Producto registrado con éxito!");
    return res.redirect("/api/addProduct");
  } catch (error) {
    console.log("Error al registrar el producto", error);
  }
};

const showProduct = async (req, res) => {
  const products = await Product.find().lean();
  return res.render("products", { products });
};

const eligePago = (req, res) => {
  res.render("mediosPago");
};

module.exports = {
  addProductForm,
  addProduct,
  showProduct,
  eligePago,
};
