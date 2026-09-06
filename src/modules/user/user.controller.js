import {
    signup,
    login,
    updateUser,
    deleteUser,
    getUser
} from "./user.service.js";


export const signupController = async (req, res) => {

    const result = await signup(req.body);

    return res.status(result.status).json(result.body);
};


export const loginController = async (req, res) => {

    const { email, password } = req.body;

    const result = await login(email, password);

    return res.status(result.status).json(result.body);
};


export const updateUserController = async (req, res) => {

    const { id } = req.params;

    const result = await updateUser(id, req.body);

    return res.status(result.status).json(result.body);
};


export const deleteUserController = async (req, res) => {

    const { id } = req.query;

    const result = await deleteUser(id);

    return res.status(result.status).json(result.body);
};


export const getUserController = async (req, res) => {

    const { id } = req.query;

    const result = await getUser(id);

    return res.status(result.status).json(result.body);
};