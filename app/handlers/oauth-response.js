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

	await redis.hset('mondo_tokens', mUserId, mToken);

	const accounts = (await MondoClient.accounts(mToken)).accounts;

	if (!accounts || !accounts.length)
		throw new Error('no Mondo accounts found');

	const accountId = accounts[0].id;

	await redis.hset('mondo_accounts', mUserId, accountId);

	await MondoClient.createFeedItem({
		account_id: accountId,
		type: 'basic',
		url: urlResolve(appBaseUrl, `chats/${mUserId}`),
		params: {
			title: 'New chat created',
			image_url: 'http://i.imgur.com/TaPHLlV.png',
		},
	}, mToken);

	res.text('👍');
}
