const express = require('express')
const router = express.Router();
const {createBigBoard, updateBigBoard} = require('../controllers/bigBoardController')


router.post('/', createBigBoard)
router.put('/:id/player/:id', updateBigBoard)


module.exports = router;
