const express = require('express');

const auth =require('../middleware/auth.middleware');
const {
    requestSession,
    acceptSession,
    rejectSession,  
    cancelSession,
    getmyrequests,
    getmysessions
} = require('../controllers/session.controller');

const router = express.Router();

router.post("/request/:mentorid", auth , requestSession);
router.put("/:id/accept", auth , acceptSession);
router.put("/:id/reject", auth , rejectSession);
router.put("/:id/cancel", auth , cancelSession);
router.get("/myrequests", auth , getmyrequests);
router.get("/mysessions", auth , getmysessions);

module.exports = router;