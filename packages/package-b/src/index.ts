import { identify as identifyUpstream } from '@rmenke/postcss-mono-repo-playground--package-a';

export function identify() {
	return identifyUpstream() + ' and @rmenke/postcss-mono-repo-playground--package-b';
}
