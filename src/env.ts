import { defineEnvVars } from '@sveltejs/kit/env';

export const {
	// Private variables
	API_BASE_URL,
	AUTH0_DOMAIN,

	// Public variables
	VITE_PUBLIC_AUTH0_CLIENT_ID
} = defineEnvVars({
	API_BASE_URL: {
		description: 'The base URL of the API',
		default: 'http://localhost:8080'
	},
	AUTH0_DOMAIN: {
		description: 'The Auth0 domain',
		default: 'lazyarchiving.eu.auth0.com'
	},
	VITE_PUBLIC_AUTH0_CLIENT_ID: {
		description: 'The Auth0 client ID',
		default: 'hT87FpBIIf42ANg2RNarYOKnZgTf1vBo'
	}
});
