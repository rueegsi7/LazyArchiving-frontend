// frontend/src/routes/documents/new/+page.server.js
import axios from "axios";
import { fail, redirect } from '@sveltejs/kit';
import { API_BASE_URL } from '$app/env/private';

export const actions = {
    createDocument: async ({ request }) => {
        const data = await request.formData();
        
        const document = {
            originalFilename: data.get('originalFilename'),
            state: data.get('state'),
            generatedTitle: data.get('generatedTitle') || null,
            extractedText: data.get('extractedText') || null
        };

        try {
            await axios({
                method: "post",
                url: `${API_BASE_URL}/api/documents`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: document,
            });
        } catch (axiosError) {
            console.log('Error creating document:', axiosError);
            return fail(502, {
                error: 'Could not create document'
            });
        }

        // Nach erfolgreichem Speichern direkt zur Übersicht weiterleiten
        throw redirect(303, '/documents');
    }
};