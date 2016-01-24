export default function (error, req, res, next) { // jshint unused:false
	res.status(error.statusCode || 500);
	res.send(`<h1>${error.message}</h1><pre>${error}</pre><pre>${error.stack}</pre>`);
}
