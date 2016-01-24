import Router from 'express-promise-router';
import home from './home';
import oauthResponse from './oauth-response';

const router = Router();
export default router;

// prefix /
router.get('/', home);
router.get('/oauth_response', oauthResponse);
