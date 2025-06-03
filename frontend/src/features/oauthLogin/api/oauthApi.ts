// 깃허브 로그인 시작 URL
export const GITHUB_OAUTH_URL =
	'https://github.com/login/oauth/authorize?client_id=Ov23liuOX60WtYLKOZUp&redirect_uri=https://issue-tracker.online/auth/github/callback';

// 깃허브에서 받은 code를 서버에 전달해서 토큰/유저 정보로 교환
export async function exchangeGithubCode(code: string) {
	const res = await fetch(`/api/oauth/github/callback?code=${code}`);
	if (!res.ok) throw new Error('OAuth 인증 실패');
	return res.json(); // { token, user }
}
