import mongoose from "mongoose";
import { NoteModel } from "./note.model.js";


export const createNote = async (data) => {
    const { title, content, userId } = data;

    const note = await NoteModel.create({
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

    const note = await NoteModel.findOne({
        _id: noteId,
        userId
    });

    if (!note) {
        return {
            status: 404,
            body: {
                message: "Note not found or you are not the owner"
            }
        };
    }

    const updatedNote = await NoteModel.findByIdAndUpdate(
        noteId,
        {
            title: data.title,
            content: data.content
        },
        {
            new: true,
            runValidators: true
        }
    );

    return {
        status: 200,
        body: {
            message: "Note updated successfully",
            note: updatedNote
        }
    };
};


export const replaceNote = async (noteId, userId, data) => {

    const note = await NoteModel.findOne({
        _id: noteId,
        userId
    });

    if (!note) {
        return {
            status: 404,
            body: {
                message: "Note not found or you are not the owner"
            }
        };
    }

    const replacedNote = await NoteModel.findOneAndReplace(
        {
            _id: noteId,
            userId
        },
        {
            title: data.title,
            content: data.content,
            userId
        },
        {
            new: true,
            runValidators: true
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

    const result = await NoteModel.updateMany(
        { userId },
        { $set: { title } },
        { runValidators: true }
    );

    return {
        status: 200,
        body: {
            message: "All notes titles updated successfully",
            modifiedCount: result.modifiedCount
        }
    };
};


export const deleteNote = async (noteId, userId) => {

    const deletedNote = await NoteModel.findOneAndDelete({
        _id: noteId,
        userId
    });

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

    const skip = (page - 1) * limit;

    const notes = await NoteModel.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalNotes = await NoteModel.countDocuments({ userId });

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

    const note = await NoteModel.findOne({
        _id: noteId,
        userId
    });

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

    const note = await NoteModel.findOne({
        userId,
        content
    });

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

    const notes = await NoteModel.find({ userId })
        .select("title userId createdAt")
        .populate("userId", "email");

    return {
        status: 200,
        body: {
            notes
        }
    };
};

export const aggregateNotes = async (userId, title) => {

    const notes = await NoteModel.aggregate([
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
    ]);

    return {
        status: 200,
        body: {
            notes
        }
    };
};


export const deleteAllNotes = async (userId) => {

    const result = await NoteModel.deleteMany({
        userId
    });

    return {
        status: 200,
        body: {
            message: "All notes deleted successfully",
            deletedCount: result.deletedCount
        }
    };
};