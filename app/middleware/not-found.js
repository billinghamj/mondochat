export default function () {
	const error = new Error('not found');
	error.statusCode = 404;
	throw error;
}
