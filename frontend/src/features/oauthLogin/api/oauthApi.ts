export const GITHUB_OAUTH_URL =
	'https://github.com/login/oauth/authorize?client_id=Ov23liuOX60WtYLKOZUp&redirect_uri=https://www.issue-tracker.online/api/auth/github/callback';

export async function exchangeGithubCode(code: string) {
	const res = await fetch(`/api/oauth/github/callback?code=${code}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});

	if (!res.ok) throw new Error('OAuth 인증 실패');

	const json = await res.json();

	if (!json.success) throw new Error(json.error || 'OAuth 인증 실패');

	return json.data;
}
