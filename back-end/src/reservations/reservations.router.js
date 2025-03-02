const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reservations.controller");

//specific routes first!

router
  .route("/:reservation_Id/status")
  .put(controller.update)
  .all(methodNotAllowed);

router
  .route("/:reservation_Id")
  .get(controller.read)
  .put(controller.modify)
  .all(methodNotAllowed);

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;
