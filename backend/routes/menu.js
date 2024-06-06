import express from "express"
import { createMenu, deleteMenu, editMenu, getMenuById, getPagingMenu, searchMenu } from "../controllers/menu.js"
import authentication from './../middlewares/authentication.js';

const router = express.Router()
router.post("/create-menu", authentication, createMenu)
router.put("/:id", authentication, editMenu)
router.delete("/:id", authentication, deleteMenu)
router.get("/get-paging-menu", authentication, getPagingMenu)
router.get("/:id", authentication, getMenuById)
router.post("/search-menu", authentication, searchMenu)
export default router