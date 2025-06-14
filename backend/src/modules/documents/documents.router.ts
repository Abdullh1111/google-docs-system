import express from "express"
import { authorized } from "../../middleware/authorized"
import documentsController from "./documents.controller"
const docsRouter = express.Router()

docsRouter.post("/create", authorized, documentsController.createDocument)

export default docsRouter