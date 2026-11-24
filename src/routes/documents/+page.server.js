import axios from "axios";
import { error, fail } from '@sveltejs/kit';
import { API_BASE_URL } from '$app/env/private';

export const actions = {
    assignToMe: async ({ request, locals }) => {
        const jwt_token = locals.jwt_token;
        if (!jwt_token) {
            throw error(401, 'Authentication required');
        }

        const data = await request.formData();
        const documentId = data.get('documentId');

        try {
            await axios({
                method: "put",
                url: `${API_BASE_URL}/api/service/me/assigndocument?documentId=${documentId}`,
                headers: { Authorization: "Bearer " + jwt_token },
            });
        } catch (err) {
            console.log('Error assigning document:', err);
        }
    },

    completeMyDocument: async ({ request, locals }) => {
        const jwt_token = locals.jwt_token;
        if (!jwt_token) {
            throw error(401, 'Authentication required');
        }

        const data = await request.formData();
        const documentId = data.get('documentId');

        try {
            await axios({
                method: "put",
                url: `${API_BASE_URL}/api/service/me/completedocument?documentId=${documentId}`,
                headers: { Authorization: "Bearer " + jwt_token },
            });
        } catch (err) {
            console.log('Error completing document:', err);
        }
    }
};