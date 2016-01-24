import MondoClient from 'mondo-bank';
import {resolve as urlResolve} from 'url';

export default async function (req, res) {
	const redis = req.app.get('redis');
	const mondoAuth = req.app.get('mondo-auth');
	const authCode = req.query.code;
	const redirUrl = req.app.get('auth-redirect-url');
	const appBaseUrl = req.app.get('app-base-url');

	const authinfo = await mondoAuth.createToken(authCode, redirUrl);
	const mUserId = authinfo.user_id;
	const mToken = authinfo.access_token;
	const mRefresh = authinfo.refresh_token;

	await redis.hset('mondo_access_tokens', mUserId, mToken);
	await redis.hset('mondo_refresh_tokens', mUserId, mRefresh);

	const accounts = (await MondoClient.accounts(mToken)).accounts;

	if (!accounts || !accounts.length)
		throw new Error('no Mondo accounts found');

	const account = accounts[0];

	await redis.hset('mondo_accounts', mUserId, account.id);
	await redis.hset('mondo_names', mUserId, account.description);

	await MondoClient.createFeedItem({
		account_id: account.id,
		type: 'basic',
		url: urlResolve(appBaseUrl, `chats/${mUserId}`),
		params: {
			title: 'New chat created',
			image_url: 'http://i.imgur.com/TaPHLlV.png',
		},
	}, mToken);

	res.send('👍');
}
