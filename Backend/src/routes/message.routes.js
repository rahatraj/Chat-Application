import express from 'express'
import AuthenticatedUser from '../middlewares/Authenticate.js';
import messageCltr from '../controllers/message.controller.js';

const router = express.Router();

router.get('/users', AuthenticatedUser,messageCltr.getUsersForSideBar)
router.get('/:id', AuthenticatedUser, messageCltr.getMessages)
router.post('/send/:id', AuthenticatedUser, messageCltr.sendMessage)

export default router;