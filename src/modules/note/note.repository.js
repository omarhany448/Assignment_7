import { NoteModel } from "./note.model.js";

export const createNoteRepository = async (data) => {
    return await NoteModel.create(data);
};

export const findNoteByIdAndUser = async (noteId, userId) => {
    return await NoteModel.findOne({
        _id: noteId,
        userId
    });
};

export const updateNoteById = async (noteId, data) => {
    return await NoteModel.findByIdAndUpdate(
        noteId,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

export const replaceNoteByIdAndUser = async (noteId, userId, data) => {
    return await NoteModel.findOneAndReplace(
        {
            _id: noteId,
            userId
        },
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

export const updateAllNotesByUser = async (userId, title) => {
    return await NoteModel.updateMany(
        { userId },
        { $set: { title } },
        { runValidators: true }
    );
};

export const deleteNoteByIdAndUser = async (noteId, userId) => {
    return await NoteModel.findOneAndDelete({
        _id: noteId,
        userId
    });
};

export const findNotesByUser = async (userId, page, limit) => {

    const skip = (page - 1) * limit;

    return await NoteModel.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
};

export const countNotesByUser = async (userId) => {
    return await NoteModel.countDocuments({ userId });
};

export const findNoteByContent = async (userId, content) => {
    return await NoteModel.findOne({
        userId,
        content
    });
};

export const findNotesWithUser = async (userId) => {
    return await NoteModel.find({ userId })
        .select("title userId createdAt")
        .populate("userId", "email");
};

export const aggregateNotesRepository = async (pipeline) => {
    return await NoteModel.aggregate(pipeline);
};

export const deleteAllNotesByUser = async (userId) => {
    return await NoteModel.deleteMany({
        userId
    });
};