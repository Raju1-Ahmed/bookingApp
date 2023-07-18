import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id",verifyAdmin, (req, res, next) => {
//     res.send("hello admin, you are logged in and you can delete all account")
// })

// router.get("/:id", verifyUser, getUser);
router.get("/:id", getUser);
router.patch("/:id",verifyUser, updateUser);
// router.delete("/:id",verifyUser, deleteUser);
router.delete("/:id", deleteUser);
// router.get("/",verifyAdmin, getUsers)
router.get("/", getUsers)

export default router
