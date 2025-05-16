import { useEffect, useState } from 'react';
import type { AuthorListData } from '../api/authorApi';
import { fetchAuthors } from '../api/authorApi';

export function useAuthorList() {
	const [data, setData] = useState<AuthorListData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		let mounted = true;

		async function load() {
			setIsLoading(true);
			try {
				const result = await fetchAuthors();
				if (mounted) {
					setData(result);
				}
			} catch (err: unknown) {
				if (mounted) {
					setError(err as Error);
				}
			} finally {
				if (mounted) {
					setIsLoading(false);
				}
			}
		}

		load();

		return () => {
			mounted = false;
		};
	}, []);

	return { data, isLoading, error };
}
