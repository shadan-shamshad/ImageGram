import { createPost, findAllPosts , deletePostById,countAllPosts, findPostById } from "../repositories/postRepository.js";

export const createPostService = async (createPostObject) => {
    // 1. Take the image of the post and upload on aws
    // 2. Get the url of the image from the new response
    // 3. Create a post with the caption and the image url in the db using repository
    // 4. Return the post object
    const caption = createPostObject.caption ?.trim();
    const image = createPostObject.Image;
    const user = createPostObject.user //add later

    const post = await createPost(caption, image, user);

    return post;
}

export const getAllPostsService = async (offset, limit) => {
    const posts = await findAllPosts(offset, limit);

    // calculate total no of posts and total no of pages
    const totalDocuments = await countAllPosts();
   
    const totalPages = Math.ceil(totalDocuments / limit);

    return {
        posts, totalPages, totalDocuments
    } 
}

export const deletePostService = async (id, user) => {
    // call the repository function
    const post = await findPostById(id);
        if(post.user !== user){
            throw{
                status: 401,
                message: "Unauthorised"
            }
        }
    const response = await deletePostById(id);
    return response;
}

export const updatePostService = async (id, updateObject) => {
    // call the repository function
    // try to implement the logic to delete old image from aws in case of update of the post image
    const response = await updatePostById(id, updateObject);
    return response;
}




// npm i aws-sdk
// npm i multer
// npm i multer-s3