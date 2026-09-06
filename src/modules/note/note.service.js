import mongoose from "mongoose";

import {
    createNoteRepository,
    findNoteByIdAndUser,
    updateNoteById,
    replaceNoteByIdAndUser,
    updateAllNotesByUser,
    deleteNoteByIdAndUser,
    findNotesByUser,
    countNotesByUser,
    findNoteByContent,
    findNotesWithUser,
    aggregateNotesRepository,
    deleteAllNotesByUser
} from "./note.repository.js";


export const createNote = async (data) => {

    const { title, content, userId } = data;

    const note = await createNoteRepository({
        title,
        content,
        userId
    });

    return {
        status: 201,
        body: {
            message: "Note created successfully",
            note
        }
    };
};


export const updateNote = async (noteId, userId, data) => {

    const note = await findNoteByIdAndUser(noteId, userId);

    if (!note) {
        return {
            status: 404,
            body: {
                message: "Note not found or you are not the owner"
            }
        };
    }

    const updatedNote = await updateNoteById(noteId, {
        title: data.title,
        content: data.content
    });

    return {
        status: 200,
        body: {
            message: "Note updated successfully",
            note: updatedNote
        }
    };
};


export const replaceNote = async (noteId, userId, data) => {

    const note = await findNoteByIdAndUser(noteId, userId);

    if (!note) {
        return {
            status: 404,
            body: {
                message: "Note not found or you are not the owner"
            }
        };
    }

    const replacedNote = await replaceNoteByIdAndUser(
        noteId,
        userId,
        {
            title: data.title,
            content: data.content,
            userId
        }
    );

    return {
        status: 200,
        body: {
            message: "Note replaced successfully",
            note: replacedNote
        }
    };
};


export const updateAllNotesTitle = async (userId, title) => {

    const result = await updateAllNotesByUser(userId, title);

    return {
        status: 200,
        body: {
            message: "All notes titles updated successfully",
            modifiedCount: result.modifiedCount
        }
    };
};


export const deleteNote = async (noteId, userId) => {

    const deletedNote = await deleteNoteByIdAndUser(
        noteId,
        userId
    );

    if (!deletedNote) {
        return {
            status: 404,
            body: {
                message: "Note not found or you are not the owner"
            }
        };
    }

    return {
        status: 200,
        body: {
            message: "Note deleted successfully",
            note: deletedNote
        }
    };
};


export const getPaginatedNotes = async (userId, page, limit) => {

    const notes = await findNotesByUser(userId, page, limit);

    const totalNotes = await countNotesByUser(userId);

    return {
        status: 200,
        body: {
            page,
            limit,
            totalNotes,
            totalPages: Math.ceil(totalNotes / limit),
            notes
        }
    };
};


export const getNoteById = async (noteId, userId) => {

    const note = await findNoteByIdAndUser(noteId, userId);

    if (!note) {
        return {
            status: 404,
            body: {
                message: "Note not found or you are not the owner"
            }
        };
    }

    return {
        status: 200,
        body: {
            note
        }
    };
};


export const getNoteByContent = async (userId, content) => {

    const note = await findNoteByContent(userId, content);

    if (!note) {
        return {
            status: 404,
            body: {
                message: "Note not found"
            }
        };
    }

    return {
        status: 200,
        body: {
            note
        }
    };
};


export const getNotesWithUser = async (userId) => {

    const notes = await findNotesWithUser(userId);

    return {
        status: 200,
        body: {
            notes
        }
    };
};


export const aggregateNotes = async (userId, title) => {

    const pipeline = [
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId)
            }
        },

        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },

        {
            $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true
            }
        },

        ...(title
            ? [
                {
                    $match: {
                        title: {
                            $regex: title,
                            $options: "i"
                        }
                    }
                }
            ]
            : []),

        {
            $project: {
                _id: 1,
                title: 1,
                content: 1,
                createdAt: 1,
                user: {
                    name: "$user.name",
                    email: "$user.email"
                }
            }
        }
    ];

    const notes = await aggregateNotesRepository(pipeline);

    return {
        status: 200,
        body: {
            notes
        }
    };
};


export const deleteAllNotes = async (userId) => {

    const result = await deleteAllNotesByUser(userId);

    return {
        status: 200,
        body: {
            message: "All notes deleted successfully",
            deletedCount: result.deletedCount
        }
    };
};