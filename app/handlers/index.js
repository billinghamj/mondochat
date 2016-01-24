import Router from 'express-promise-router';
import home from './home';
import oauthResponse from './oauth-response';
import chatScreen from './chat-screen';
import chatSend from './chat-send';

const router = Router();
export default router;

// prefix /
router.get('/', home);
router.get('/oauth_response', oauthResponse);
router.get('/chats/:user_id', chatScreen);
router.post('/chats/:user_id', chatSend);
