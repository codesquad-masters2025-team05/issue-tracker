import type { DropdownOption } from '@/shared/ui/Dropdown/DropdownOption';
import type { Author } from './author.types';
import type { User } from './user.types';

export function parseUserToDropdownOption(user: User): DropdownOption {
	return {
		id: user.id,
		display: user.username,
		imageUrl: user.imageUrl,
	};
}

export function parseAuthorToDropdownOption(author: Author): DropdownOption {
	return {
		id: author.id,
		display: author.username,
		imageUrl: author.imageUrl,
	};
}
