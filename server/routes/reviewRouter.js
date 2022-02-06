const Express = require('express')
const router = Express.Router()
const reviewController = require("../controllers/reviewController")
const authMiddleware = require('../middleware/authMiddleware')
const checkCacheMiddleware = require('../middleware/checkCacheMiddleware')
const saveCacheMiddleware = require('../middleware/saveCacheMiddleware')
const deleteCacheMiddleware = require('../middleware/deleteCacheMiddleware')

router.post("/", authMiddleware,  deleteCacheMiddleware, reviewController.create)
router.get("/:product_id", checkCacheMiddleware, reviewController.getByProductId, saveCacheMiddleware)
router.get("/rating/:product_id", checkCacheMiddleware, reviewController.getRating, saveCacheMiddleware)
router.delete("/:review_id", authMiddleware, deleteCacheMiddleware, reviewController.delete)

module.exports = router