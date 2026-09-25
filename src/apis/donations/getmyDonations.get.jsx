async function GetMyDonation() {
    const userId = localStorage.getItem('userId');
    if (!userId) return [];

    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const response = await fetch(`${backendApi}donation/mydonation/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch donations (${response.status})`);
    }

    return response.json();
}

export default GetMyDonation;