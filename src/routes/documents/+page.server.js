import axios from "axios";
import { error, fail } from '@sveltejs/kit';
import { API_BASE_URL } from '$app/env/private';

export async function load({ url, locals }) {
    const jwt_token = locals.jwt_token;

    if (!jwt_token) {
        return {
            documents: [],
            nrOfPages: 0,
            currentPage: 1
        };
    }

    try {
        const currentPage = parseInt(url.searchParams.get('pageNumber') || '1');
        const pageSize = parseInt(url.searchParams.get('pageSize') || '4');

        let query = `?pageSize=${pageSize}&pageNumber=${currentPage}`;

        const documentsResponse = await axios({
            method: "get",
            url: `${API_BASE_URL}/api/documents` + query,
            headers: { Authorization: "Bearer " + jwt_token },
        });

        return {
            documents: documentsResponse.data.content,
            nrOfPages: documentsResponse.data.totalPages || 0,
            currentPage: currentPage
        };
    } catch (axiosError) {
        console.log('Error loading documents:', axiosError);
        return {
            documents: [],
            nrOfPages: 0,
            currentPage: 1
        };
    }
}