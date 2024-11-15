// Here all the post related routes are present
// we look at the remaining url part after /posts

import express from 'express';

import {s3uploader } from '../config/multerConfig.js';
import { createPost, deletePost, getAllPosts,updatePost } from '../controllers/postController.js';
import { zodPostSchema } from '../../validators/zodPostSchema.js';
import { validate } from '../../validators/zodValidators.js';
import { isAdmin, isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router(); //Router object to modularize the routes

/**
 * @swagger
 * posts:
 * post:
 * summary: Create a new post
 * description: Create a new post
 *      responses: 
 *          200:
 *             message: Post Created Successfully
 * 
 */

//  localhost:3000/api-docs/#/

// zod does not support files so we are not validating image here
router.post('/', isAuthenticated, s3uploader.single('image'), validate(zodPostSchema), createPost );

router.get('/', getAllPosts);

router.delete('/:id',isAuthenticated, deletePost );

router.put('/:id',isAuthenticated, isAdmin, s3uploader.single('image'), updatePost  );

export default router;

// write 2 apis to implement deletion of the post and update of a post


