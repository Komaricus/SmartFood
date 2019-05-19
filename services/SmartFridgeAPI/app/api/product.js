const mongoose = require('mongoose');
const mongodb = require('mongodb');

const api = {};

// Add Product
api.createProduct = (Product) => (req, res) => {
  if (
    !req.body.title ||
    !req.body.cals ||
    !req.body.prots ||
    !req.body.fats ||
    !req.body.carbs ||
    !req.body.type
  ) res.json({
    success: false,
    message: 'Заполните обязательные поля'
  });
  else {
    const product = new Product({
      title: req.body.title,
      exDate: req.body.exDate || "",
      cals: req.body.cals,
      prots: req.body.prots,
      fats: req.body.fats,
      carbs: req.body.carbs,
      fibers: req.body.fibers || "",
      water: req.body.water || "",
      img: req.body.img || "",
      descr: req.body.descr || "",
      type: req.body.type || "",
      quant: req.body.quant || "",
      sku: req.body.sku || []
    });

    product.save(error => {
      if (error) return res.status(400).json({
        success: false,
        message: 'Название уже используется'
      });
      res.json({
        success: true,
        message: 'Продукт создан'
      });
    });
  }
}

// Delete Product
api.deleteProduct = (Product) => (req, res) => {

  Product.findByIdAndDelete({
    _id: req.params.id,
  }, (error) => {
    if (error) throw error;
    res.status(200).send();
  });
}

// Find One Product
api.findProduct = (Product) => (req, res) => {

  Product.find({
    _id: req.params.id
  }, (error, product) => {
    if (error) throw error;
    res.status(200).json(product);
  });

}

api.findProductByName = (Product) => (req, res) => {

  Product.find({
    sku: req.params.title
  }, (error, product) => {
    if (error) throw error;
    res.status(200).json(product);
  });

}

// For Scaner
api.findProductBySKU = (Product) => (req, res) => {

  Product.find({
    sku: {
      $in: [req.params.sku]
    }
  }, (error, product) => {
    if (error) throw error;
    res.status(200).json(product);
  });

}

api.updateProductSKU = (Product) => (req, res) => {

  Product.findByIdAndUpdate(req.params.id, {
    $push: {
      sku: req.body.sku
    }
  }, {
    new: true
  }, function (err, product) {
    if (err) return handleError(err);
    res.status(200).json(product)
  });
}

// Load Products
api.loadProducts = (Product) => (req, res) => {
  Product.find({
    type: req.params.category
  }, (error, products) => {
    if (error) throw error;
    res.status(200).json(products);
  });
}

// Load all products
api.loadAllProducts = (Product) => (req, res) => {
  Product.find({}, (err, products) => {
    if (err) throw err;
    res.status(200).json(products)
  })
}

module.exports = api;