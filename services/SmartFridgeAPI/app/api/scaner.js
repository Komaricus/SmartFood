const mongoose = require('mongoose');
const mongodb = require('mongodb');

const api = {};

api.createScaner = (Scaner) => (req, res) => {

  const scaner = new Scaner({
    name: req.params.name,
    user: "",
    barcodes: []
  });

  scaner.save(error => {
    if (error) return res.status(400).json({
      success: false,
      message: 'Произошла ошибка'
    });
    res.json({
      success: true,
      message: 'Сканер создан'
    });
  });

}

api.updateScaner = (Scaner) => (req, res) => {

  Scaner.findOneAndUpdate({
    name: req.params.name
  }, {
    $push: {
      barcodes: req.body.barcode
    }
  }), (error) => {
    if (error) throw error;
    res.status(200).send();
  }
}

api.findScaner = (Scaner) => (req, res) => {

  Scaner.find({
    name: req.params.name
  }, (error, scaner) => {
    if (error) throw error;
    res.status(200).json(scaner);
  });

}

api.deleteScaner = (Scaner) => (req, res) => {

  Scaner.findAndDelete({
    name: req.params.name
  }, (error) => {
    if (error) throw error;
    res.status(200).send();
  });
}

module.exports = api;