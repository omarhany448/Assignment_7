import {
    createNote,
    updateNote,
    replaceNote,
    updateAllNotesTitle,
    deleteNote,
    getPaginatedNotes,
    getNoteById,
    getNoteByContent,
    getNotesWithUser,
    aggregateNotes,
    deleteAllNotes
} from "./note.service.js";


export const createNoteController = async (req, res) => {

    const { id } = req.query;

    const result = await createNote({
        ...req.body,
        userId: id
    });

    return res.status(result.status).json(result.body);
};


export const updateNoteController = async (req, res) => {

    const { id } = req.query;
    const { noteId } = req.params;

    const result = await updateNote(
        noteId,
        id,
        req.body
    );

    return res.status(result.status).json(result.body);
};


export const replaceNoteController = async (req, res) => {

    const { id } = req.query;
    const { noteId } = req.params;

    const result = await replaceNote(
        noteId,
        id,
        req.body
    );

    return res.status(result.status).json(result.body);
};


export const updateAllNotesTitleController = async (req, res) => {

    const { id } = req.query;
    const { title } = req.body;

    const result = await updateAllNotesTitle(
        id,
        title
    );

    return res.status(result.status).json(result.body);
};

export const deleteNoteController = async (req, res) => {

    const { id } = req.query;
    const { noteId } = req.params;

    const result = await deleteNote(
        noteId,
        id
    );

    return res.status(result.status).json(result.body);
};

export const getPaginatedNotesController = async (req, res) => {

    const { id, page = 1, limit = 10 } = req.query;

    const result = await getPaginatedNotes(
        id,
        Number(page),
        Number(limit)
    );

    return res.status(result.status).json(result.body);
};

export const getNoteByIdController = async (req, res) => {

    const { id } = req.query;
    const { noteId } = req.params;

    const result = await getNoteById(
        noteId,
        id
    );

    return res.status(result.status).json(result.body);
};

export const getNoteByContentController = async (req, res) => {

    const { id, content } = req.query;

    const result = await getNoteByContent(
        id,
        content
    );

    return res.status(result.status).json(result.body);
};

export const getNotesWithUserController = async (req, res) => {

    const { id } = req.query;

    const result = await getNotesWithUser(id);

    return res.status(result.status).json(result.body);
};

export const aggregateNotesController = async (req, res) => {

    const { id, title } = req.query;

    const result = await aggregateNotes(
        id,
        title
    );

    return res.status(result.status).json(result.body);
};


export const deleteAllNotesController = async (req, res) => {
    const { id } = req.query;

    const result = await deleteAllNotes(id);

    return res.status(result.status).json(result.body);
};