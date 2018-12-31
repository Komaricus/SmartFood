const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Products
router.get('/', async (req, res) => {
  const products = await loadProductsCollections();
  res.send(await products.find({}).toArray());
});

//Add Product
router.post('/', async (req, res) => {
  const products = await loadProductsCollections();
  await products.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

//Delete Product
router.delete('/:id', async (req, res) => {
  const products = await loadProductsCollections();
  await products.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  });
  res.status(200).send();
});
async function loadProductsCollections() {
  const client = await mongodb.MongoClient.connect('mongodb://admin:Thefurnace98@ds129321.mlab.com:29321/smart_fridge', {
    useNewUrlParser: true
  });

  return client.db('smart_fridge').collection('products');
}

module.exports = router;