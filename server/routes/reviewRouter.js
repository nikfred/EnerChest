const Router = require("express")
const router = Router()
const reviewController = require("../controllers/reviewController")
const authMiddleware = require('../middleware/authMiddleware')

router.post("/", authMiddleware, reviewController.create)
router.get("/:product_id", reviewController.getByProductId)
router.get("/rating/:product_id", reviewController.getRating)
router.delete("/:review_id", authMiddleware, reviewController.delete)

module.exports = router