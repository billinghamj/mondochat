export default async function (req, res) {
	const auth = req.get('mondo-auth');
	const url = req.get('auth-redirect-url');

	const redir = auth.authorizationUrl(url);

	res.redirect(redir);
}
