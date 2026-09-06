import { UserModel } from "./user.model.js";

export const findUserByEmail = async (email) => {
    return await UserModel.findOne({ email });
};

export const createUser = async (data) => {
    return await UserModel.create(data);
};

export const findUserById = async (id) => {
    return await UserModel.findById(id);
};

export const updateUserById = async (id, data) => {
    return await UserModel.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

export const deleteUserById = async (id) => {
    return await UserModel.findByIdAndDelete(id);
};