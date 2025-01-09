import express from 'express'
import { checkSchema } from 'express-validator';
import userCltr from '../controllers/auth.controllers.js';
import { userLoginValidation, userRegistrationValidation } from '../validations/user-validation-schema.js'
import AuthenticatedUser from '../middlewares/Authenticate.js'

const router = express.Router();

router.post('/signup',checkSchema(userRegistrationValidation), userCltr.register);
router.post('/login', checkSchema(userLoginValidation), userCltr.login)
router.post('/logout', userCltr.logout)

router.put('/update-profile', AuthenticatedUser, userCltr.updateProfile)

router.get('/check', AuthenticatedUser, userCltr.checkAuth)


export default router;