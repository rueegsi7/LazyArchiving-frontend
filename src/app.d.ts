// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            jwt_token?: string;
            user?: {
                name?: string;
                email?: string;
                given_name?: string;
                family_name?: string;
                nickname?: string;
                picture?: string;
                user_roles?: string[];
                [key: string]: any;
            };
            isAuthenticated?: boolean;
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
