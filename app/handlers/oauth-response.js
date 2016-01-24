export default async function (req, res) {
	const auth = req.get('mondo-auth');
	const url = req.get('auth-redirect-url');
	const code = req.query.code;

	const redir = auth.authorizationUrl(url);
	const tokenInfo = await auth.createToken(code, redir);

	res.json(tokenInfo);
}
