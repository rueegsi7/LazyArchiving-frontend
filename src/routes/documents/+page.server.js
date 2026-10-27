// frontend/src/routes/documents/+page.server.js
import axios from "axios";
import { fail } from '@sveltejs/kit';
import { API_BASE_URL } from '$app/env/private';

export async function load() {
    try {
        const documentsResponse = await axios({
            method: "get",
            url: `${API_BASE_URL}/api/documents`,
        });

        return {
            documents: documentsResponse.data
        };
    } catch (axiosError) {
        console.log('Error loading documents:', axiosError);
        return {
            documents: []
        };
    }
}

export const actions = {
    createDocument: async ({ request }) => {
        const data = await request.formData();
        const doc = {
            originalFilename: data.get('originalFilename'),
            generatedTitle: data.get('generatedTitle'),
            state: data.get('state')
        };

        try {
            await axios({
                method: "post",
                url: `${API_BASE_URL}/api/documents`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: doc,
            });

            return { success: true };
        } catch (error) {
            console.log('Error creating document:', error);

            return fail(502, {
                success: false,
                error: 'Could not create document'
            });
        }
    }
};