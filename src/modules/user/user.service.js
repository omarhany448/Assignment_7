import bcrypt from "bcryptjs";

import {
    findUserByEmail,
    createUser,
    findUserById,
    updateUserById,
    deleteUserById
} from "./user.repository.js";


export const signup = async (data) => {

    const { name, email, password, phone, age } = data;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        return {
            status: 409,
            body: {
                message: "Email already exists"
            }
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
        name,
        email,
        password: hashedPassword,
        phone,
        age
    });

    return {
        status: 201,
        body: {
            message: "User added successfully",
            user
        }
    };
};


export const login = async (email, password) => {

    const user = await findUserByEmail(email);

    if (!user) {
        return {
            status: 401,
            body: {
                message: "Invalid email or password"
            }
        };
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        return {
            status: 401,
            body: {
                message: "Invalid email or password"
            }
        };
    }

    return {
        status: 200,
        body: {
            message: "Login successfully",
            user
        }
    };
};


export const updateUser = async (id, data) => {

    const user = await findUserById(id);

    if (!user) {
        return {
            status: 404,
            body: {
                message: "User not found"
            }
        };
    }

    if (data.email && data.email !== user.email) {

        const emailExists = await findUserByEmail(data.email);

        if (emailExists) {
            return {
                status: 409,
                body: {
                    message: "Email already exists"
                }
            };
        }
    }

    const allowedData = {};

    if (data.name !== undefined) {
        allowedData.name = data.name;
    }

    if (data.email !== undefined) {
        allowedData.email = data.email;
    }

    if (data.phone !== undefined) {
        allowedData.phone = data.phone;
    }

    if (data.age !== undefined) {
        allowedData.age = data.age;
    }

    const updatedUser = await updateUserById(id, allowedData);

    return {
        status: 200,
        body: {
            message: "User updated",
            user: updatedUser
        }
    };
};


export const deleteUser = async (id) => {

    const user = await deleteUserById(id);

    if (!user) {
        return {
            status: 404,
            body: {
                message: "User not found"
            }
        };
    }

    return {
        status: 200,
        body: {
            message: "User deleted"
        }
    };
};


export const getUser = async (id) => {

    const user = await findUserById(id);

    if (!user) {
        return {
            status: 404,
            body: {
                message: "User not found"
            }
        };
    }

    return {
        status: 200,
        body: {
            user
        }
    };
};