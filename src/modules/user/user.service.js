import { UserModel } from "./user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (data) => {

    const { name, email, password, phone, age } = data;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        return {
            status: 409,
            body: {
                message: "Email already exists"
            }
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
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

    const user = await UserModel.findOne({ email });

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

    const user = await UserModel.findById(id);

    if (!user) {
        return {
            status: 404,
            body: {
                message: "User not found"
            }
        };
    }

    if (data.email && data.email !== user.email) {

        const emailExists = await UserModel.findOne({
            email: data.email
        });

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

    const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        allowedData,
        {
            new: true,
            runValidators: true
        }
    );

    return {
        status: 200,
        body: {
            message: "User updated",
            user: updatedUser
        }
    };
};

export const deleteUser = async (id) => {

    const user = await UserModel.findByIdAndDelete(id);

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

    const user = await UserModel.findById(id);

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

