import express from "express"
import { authorized } from "../../middleware/authorized"
import documentsController from "./documents.controller"
const docsRouter = express.Router()

docsRouter.post("/create", authorized, documentsController.createDocument)
docsRouter.get("/", authorized, documentsController.getDocuments)
docsRouter.put("/share", authorized, documentsController.sharedWith)
docsRouter.put("/:id", authorized, documentsController.updateDocument)
docsRouter.delete("/:id", authorized, documentsController.deleteDocument)
docsRouter.get("/:id", authorized, documentsController.getDocument)

export default docsRouter