import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    Content: {
        type: String,
        require: true,
        minLength: 1
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        refPath: 'User',
    },
    onModel: {
        type: String,
        require: true,
        enum: ['Post', 'Comment']
    },
    commentableId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        refPath: 'onModel',
    },
    replies:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]

}, {timestamps: true});

const Comment = mongoose.model("Like", CommentSchema);

export default Comment;

/**
 * C1:
 *  replies: [
 *      C2:
 *      C3:
 *      C4: 
 *          replies: [C5]
 *                
 *      ]

*/

//repository    --> controller  --> service all have to be done

// write an API to create comments on a post or another comment
