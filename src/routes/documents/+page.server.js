import axios from "axios";
import { error, fail } from '@sveltejs/kit';
import { API_BASE_URL } from '$app/env/private';

export async function load({ locals }) {
    const jwt_token = locals.jwt_token;

    if (!jwt_token) {
        return {
            documents: []
        };
    }

    try {
        const documentsResponse = await axios({
            method: "get",
            url: `${API_BASE_URL}/api/documents`,
            headers: { Authorization: "Bearer " + jwt_token }
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