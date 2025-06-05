import { useEffect, useRef } from 'react';

export function useClickAway<T extends HTMLElement>(handler: () => void) {
	const ref = useRef<T | null>(null);

	useEffect(() => {
		function onClick(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				handler();
			}
		}
		document.addEventListener('mousedown', onClick);
		return () => document.removeEventListener('mousedown', onClick);
	}, [handler]);

	return ref;
}
