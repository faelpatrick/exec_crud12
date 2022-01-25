import bcrypt from "bcryptjs";

export const createPasswordHash = async (password) => bcrypt.hash(password, 8);
export const checkPasswor = async (user, password) => bcrypt.compare(password, user.password);
