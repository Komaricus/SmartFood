module.exports = {
    loadDietsByCategory: (Diet) => (req, res) => {
        Diet.find({
            category: req.params.category,
        }, (err, result) => {
            if (err) throw err;
            res.status(200).json(result);
        })
    },
    loadDietById: (Diet) => (req, res) => {
        Diet.find({
            id: req.params.id,
        }, (err, result) => {
            if (err) throw err;
            res.status(200).json(result);
        })
    }
};

