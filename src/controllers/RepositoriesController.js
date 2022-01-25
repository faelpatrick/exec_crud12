import User from "../models/User";
import Repository from "../models/Repository";
import { createPasswordHash } from "../services/auth"

class RepositoriesController {

    async index(req, res) {
        try {
            const { user_id } = req.params;
            const user = await User.findById(user_id);
            if (!user) return res.status(404).json({ message: `User ${user_id} not found.` });
            const repositories = await Repository.find({ userId: user_id });
            if (!repositories) return res.status(404).json({ message: "Repositories not found." });
            return res.status(200).json(repositories);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async create(req, res) {
        try {
            const { user_id } = req.params;
            const { name, url } = req.body;
            const user = await User.findById(user_id);
            if (!user) return res.status(404).json({ message: `User id: ${user_id} not found.` });
            const repository = await Repository.findOne({ userId: user_id, name });
            if (repository) return res.status(422).json({ message: `Repository ${name} alread exits.` });
            const newRepository = await Repository.create({ name, url, userId: user_id });
            return res.status(201).json(newRepository);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async read(req, res) {
        try {
            const { user_id, repository_id } = req.params;
            const user = await User.findById(user_id);
            if (!user) return res.status(404).json({ message: "User not found." });
            const repository = await Repository.findById(repository_id);
            if (!repository) return res.status(404).json({ message: "Repository not found." });
            return res.status(200).json(repository);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async update(req, res) {
        try {
            const { user_id, repository_id } = req.params;
            const { name, url } = req.body;
            const user = await User.findById(user_id);
            if (!user) return res.status(404).json({ message: "User not found." });
            const repository = await Repository.findById(repository_id);
            if (!repository) return res.status(404).json({ message: "Repository not found." });
            await repository.updateOne({ name, url, userId: user_id });
            return res.status(200).json({ message: "Repository updated." })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async delete(req, res) {
        try {
            const { user_id, repository_id } = req.params;
            const user = await User.findById(user_id);
            if (!user) return res.status(404).json({ message: "User not found." });
            const repository = await Repository.findById(repository_id);
            if (!repository) return res.status(404).json({ message: "Repository not found." });
            await repository.deleteOne();
            return res.status(200).json({ message: "Repository Deleted." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }
}

export default new RepositoriesController();