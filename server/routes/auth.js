import express from 'express';
import { register, login} from '../controllers/auth.js';
//import { upload } from '../utils/upload.js';
//import { verifyToken } from '../utils/verifyToken.js';

//Allow express to identify routes and that they are configured in a separate file
const router = express.Router();

router.post('/login', login); //automatically prefix with /auth (look at call)

export default router;