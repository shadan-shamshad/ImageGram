// Aftert /users the remaining part of url is handled here

import express from 'express';

import { getProfile } from '../../controllers/userController.js';
import { validate } from '../../validators/zodValidators.js';
import { zodSignupSchema } from '../../validators/zodSignupSchema.js';
import { zodSigninSchema } from '../../validators/zodSigninSchema.js';

const router = express.Router();

router.get('/profile', getProfile);

/**
 * @Swagger
 * /users/signup;
 *  post:
 *      summary: Signup a new user
 *      description: Signup a new user
 */
router.post('/signup', validate(zodSignupSchema), signup);


/**
 * @Swagger
 * /users/signin;
 *  post:
 *      summary: Signin a new user
 *      description: Signin a new user
 */

router.posr('/signin', validate(zodSigninSchema),  signin);

export default router;