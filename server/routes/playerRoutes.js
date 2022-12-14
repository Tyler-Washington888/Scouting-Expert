const express = require('express')
const router = express.Router();
const {createPlayer, getPlayer, updatePlayer, deletePlayer} = require('../controllers/playerController')

router.route('/').post(createPlayer).get(getPlayer)
router.route('/:id').put(updatePlayer).delete(deletePlayer)

module.exports = router;