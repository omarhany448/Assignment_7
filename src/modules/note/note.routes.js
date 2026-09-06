import { Router } from "express";

import {
    createNoteController,
    updateNoteController,
    replaceNoteController,
    updateAllNotesTitleController,
    deleteNoteController,
    getPaginatedNotesController,
    getNoteByIdController,
    getNoteByContentController,
    getNotesWithUserController,
    aggregateNotesController,
    deleteAllNotesController
} from "./note.controller.js";

const router = Router();


// 1. Create note
router.post("/", createNoteController);


// 3. Replace entire note
router.put("/replace/:noteId", replaceNoteController);


// 4. Update title of all notes
router.patch("/all", updateAllNotesTitleController);


// 9. Get note by content
router.get("/note-by-content", getNoteByContentController);


// 10. Get notes with user information
router.get("/note-with-user", getNotesWithUserController);


// 11. Aggregation
router.get("/aggregate", aggregateNotesController);


// 7. Pagination + sorting
router.get("/paginate-sort", getPaginatedNotesController);


// 12. Delete all notes
router.delete("/all", deleteAllNotesController);


// 2. Update single note
router.patch("/:noteId", updateNoteController);


// 5. Delete single note
router.delete("/:noteId", deleteNoteController);


// 8. Get single note
router.get("/:noteId", getNoteByIdController);


export default router;