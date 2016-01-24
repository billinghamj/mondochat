export default async function (req, res) {
	const auth = req.app.get('mondo-auth');
	const url = req.app.get('auth-redirect-url');
	const code = req.query.code;

	try {
		const tokenInfo = await auth.createToken(code, url);

		res.json(tokenInfo);
	} catch (error) {
		res.json(error);
	}
}
