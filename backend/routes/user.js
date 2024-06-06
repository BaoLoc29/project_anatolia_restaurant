import express from "express"
import { login, createUser, editUser, deleteUser, getPagingUser, searchUser, getUserProfile, changePassword, getUserById } from "../controllers/user.js"
import authentication from './../middlewares/authentication.js';

const router = express.Router()
router.post("/login", login)
router.get("/get-user-profile", authentication, getUserProfile)
router.post("/create-user", authentication, createUser)
router.put("/:id", authentication, editUser)
router.delete("/:id", authentication, deleteUser)
router.get("/get-paging-user", authentication, getPagingUser)
router.post("/search-user", authentication, searchUser)
router.put("/change-password/:id", authentication, changePassword)
router.get("/:id", authentication, getUserById)
export default router