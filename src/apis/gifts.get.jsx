async function ServiceGifts() {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const response = await fetch(`${backendApi}servicegifts`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const data = await response.json();

    if(!data){
        throw new Error('Failed to fetch service gifts')
    };

    return data;
}

export default ServiceGifts;