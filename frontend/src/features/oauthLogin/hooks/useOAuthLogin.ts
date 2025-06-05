import { useQuery } from '@tanstack/react-query';
import { exchangeGithubCode } from '../api/oauthApi';

export function useOAuthLogin(code: string) {
	const {
		data: authData,
		isLoading,
		isError,
		error,
		isSuccess,
	} = useQuery({
		queryKey: ['github-oauth', code],
		queryFn: () => exchangeGithubCode(code),
	});

	return {
		authData,
		isLoading,
		isError,
		error,
		isSuccess,
	};
}
