import MondoClient from 'mondo-bank';

export default class MondoAuth {
	constructor(clientId, clientSecret, options) {
		options = options || {};

		this._auth = { clientId, clientSecret };
		this._authBaseUrl = options.authBaseUrl || 'https://auth.getmondo.co.uk';
	}

	authorizationUrl(redirectUrl, state) {
		let url = `${this._authBaseUrl}?response_type=code`;
		url += `&client_id=${encodeURIComponent(this._auth.clientId)}`;
		url += `&redirect_uri=${encodeURIComponent(redirectUrl)}`;

		if (state)
			url += `&state=${encodeURIComponent(state)}`;

		return url;
	}

	async createToken(code, redirectUrl) {
		return await MondoClient.token({
			client_id: this._auth.clientId,
			client_secret: this._auth.clientSecret,
			grant_type: 'authorization_code',
			redirect_uri: redirectUrl,
			code: code,
		});
	}
}
