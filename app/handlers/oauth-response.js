export default async function (req, res) {
	const auth = req.app.get('mondo-auth');
	const url = req.app.get('auth-redirect-url');
	const code = req.query.code;

	const redir = auth.authorizationUrl(url);
	const tokenInfo = await auth.createToken(code, redir);

	res.json(tokenInfo);
}
