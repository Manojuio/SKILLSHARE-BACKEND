const express = require('express');

const auth = require('../middleware/auth.middleware');
const { getProfile, updateProfile, deleteProfile } = require('../controllers/user.controller');

const router = express.Router();

router.get("/me",auth,getProfile);
router.put("/me",auth,updateProfile);
router.delete("/:id",auth,deleteProfile);

module.exports = router;