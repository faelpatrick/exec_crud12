import jwt from "jsonwebtoken";
import User from "../models/User";
import { checkPasswor } from "../services/auth";

import authConfig from "../config/auth";

class SessionController {
    async create(req, res) {

        try {

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) return res.status(401).json({ error: "User / Password not found." });
            const passwordChecked = await checkPasswor(user, password);
            if (!passwordChecked) return res.status(401).json({ error: "User / Password not found." });
            const { id } = user;
            return res.json({
                user: {
                    id,
                    email
                },
                token:
                    jwt.sign(
                        { id }, authConfig.secret,
                        {
                            expiresIn: authConfig.expiresIn,
                        })
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Inernal server error." });
        }
    }
}

export default new SessionController();