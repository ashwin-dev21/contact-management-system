const express = require("express");
const { getContact, createContact, getContactById, updateContact, deleteContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken);
router.route("/").get(getContact).post(createContact)  
router.route("/:id").get(getContactById).put(updateContact).delete(deleteContact)

module.exports = router;