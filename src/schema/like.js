
import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    onModel: {
        type: String,
        require: true,
        enum: ['Post', 'Comment']
    },
    likeableId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        refPath: 'onModel',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        refPath: 'User',
    },


}, {timestamps: true});

const like = mongoose.model("Like", likeSchema);

export default like;