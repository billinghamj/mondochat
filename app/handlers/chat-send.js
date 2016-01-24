import MondoClient from 'mondo-bank';
import {resolve as urlResolve} from 'url';

export default async function (req, res) {
	const redis = req.app.get('redis');
	const appBaseUrl = req.app.get('app-base-url');
	const {userId, message} = req.body;

	const [allUsers, sender] = await Promise.all([
		redis.hvals('mondonauts'),
		redis.hget('mondonauts', userId),
	]);

	await Promise.all(allUsers.map(async function (user) {
		try {
			await MondoClient.createFeedItem({
				account_id: user.accountId,
				type: 'basic',
				url: urlResolve(appBaseUrl, `chats/${user.id}`),
				params: {
					title: `From: ${sender.name}`,
					body: message,
					image_url: 'http://i.imgur.com/TaPHLlV.png',
				},
			}, user.accessToken);
		} catch (error) {
			console.warn('send failed', error);
			redis.hdel('mondonauts', user.id);
		}
	}));

	res.render('chat', { userId });
}
