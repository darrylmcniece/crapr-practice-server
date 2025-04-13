const { Router } = require("express");
const isAuthenticated = require("../middleware/isAuthenticated.js");
const addImages = require("../middleware/addImages.js");
const validObjectId = require("../middleware/validObjectId.js");
const sanitizeBody = require("../middleware/sanitizeBody.js");
const crapController = require("../controllers/crap.js");

const router = Router();

router.get("/", isAuthenticated, crapController.getAll);
router.get("/:id", isAuthenticated, crapController.getById);
router.post(
  "/",
  isAuthenticated,
  addImages,
  sanitizeBody,
  crapController.create
);
router.post("/:id/interested", crapController.interested);
router.post("/:id/available", crapController.available);
// router.post("/:id/suggest", crapController.create);
// router.post("/:id/agree", crapController.create);
// router.post("/:id/disagree", crapController.create);
// router.post("/:id/reset", crapController.create);
// router.post("/:id/flush", crapController.create);
router.patch("/:id", isAuthenticated, crapController.update);
router.delete("/:id", isAuthenticated, crapController.deleteOne);

module.exports = router;
