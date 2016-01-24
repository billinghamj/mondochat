export default async function (req, res) {
	const auth = req.app.get('mondo-auth');
	const url = req.app.get('auth-redirect-url');

	const redir = auth.authorizationUrl(url);

	res.redirect(redir);
}
