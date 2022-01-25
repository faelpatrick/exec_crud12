import mongoose from "mongoose";

const repositorySchema = new mongoose.Schema({
    name: { type: String, required: true, },
    url: { type: String, required: true, },
    userId: { type: String, required: true, }
}, { timestamps: true });

export default new mongoose.model("Repository", repositorySchema);