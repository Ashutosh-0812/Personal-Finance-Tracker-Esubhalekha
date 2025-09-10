const express = require('express');
const { getFinancialSummary } = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.use(protect);

router.get('/summary', getFinancialSummary);

module.exports = router;