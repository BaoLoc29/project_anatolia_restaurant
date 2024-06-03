import express from "express"
import { createTable, deleteTable, editTable, getPagingTable, getTableById, searchTable } from "../controllers/table.js"
import authentication from './../middlewares/authentication.js';

const router = express.Router()
router.post("/create-table", authentication, createTable)
router.put("/:id", authentication, editTable)
router.delete("/:id", authentication, deleteTable)
router.get("/get-paging-table", authentication, getPagingTable)
router.get("/:id", authentication, getTableById)
router.post("/search-table", authentication, searchTable)
export default router