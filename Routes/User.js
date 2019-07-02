const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		messeger: 'This is get all'
	})
});

router.post('/posts', (req, res, next) => {
	const {name, age, pass} = req.body;
	console.log(req.body);
	res.status(201).json({
		name: req.body.name,
		age: req.body.age,
		pass: req.body.pass,
		messeger: 'thanh cong '
	})
});


router.get('/:id', (req, res, next) => {
    const {id} = req.params;
	res.status(200).json({
		messeger: 'this is get ' + id
	});
});

router.put('/:id', (req, res, next) => {
    const {id} = req.params;
    const {newId} = req.body;
	res.status(200).json({
		messeger: 'this is put id: ' + id + ' to ' + newId
	});
});

router.delete('/:id', (req, res, next) => {
    const {id} = req.params;
	res.status(200).json({
		messeger: 'this is delete id: ' + id
	});
});

module.exports = router;