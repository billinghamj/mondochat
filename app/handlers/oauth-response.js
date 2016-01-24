export default async function (req, res) {
	const auth = req.app.get('mondo-auth');
	const url = req.app.get('auth-redirect-url');
	const code = req.query.code;

	const authInfo = await auth.createToken(code, url);
	const token = authInfo.access_token;

	res.json(token);
}
