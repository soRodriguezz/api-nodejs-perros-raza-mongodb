const express = require("express");
const router = express.Router();
const authJwt = require("../middlewares/authJwt");

const { createRole, listRoles, searchRole, removeSoftRole } = require("../controllers/role.controller");

router.post("/role/", [authJwt.verifyToken, authJwt.isAdmin], createRole);
router.get("/roles/", [authJwt.verifyToken, authJwt.isAdmin], listRoles);
router.get("/role/:slug", [authJwt.verifyToken, authJwt.isAdmin], searchRole);
router.patch("/roles/:slug", [authJwt.verifyToken, authJwt.isAdmin], removeSoftRole);

module.exports = router;