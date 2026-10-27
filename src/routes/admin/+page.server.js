import axios from "axios";
import { API_BASE_URL } from '$app/env/private';

export async function load({ locals }) {
    const jwt_token = locals.jwt_token;
    const user_info = locals.user;

    if (!jwt_token || !user_info?.user_roles?.includes('admin')) {
        return { allDocuments: [], stats: {} };
    }

    try {
        const [docsRes, statsRes] = await Promise.all([
            axios.get(`${API_BASE_URL}/api/documents/admin/all`, {
                headers: { Authorization: "Bearer " + jwt_token }
            }),
            axios.get(`${API_BASE_URL}/api/documents/stats`, {
                headers: { Authorization: "Bearer " + jwt_token }
            })
        ]);

        return {
            allDocuments: docsRes.data,
            stats: statsRes.data
        };
    } catch (error) {
        console.log('Error loading admin data:', error);
        return { allDocuments: [], stats: {} };
    }
}