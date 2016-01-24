export default async function (req, res) {
	const userId = req.params.user_id;

	res.render('chat', { userId });
}
