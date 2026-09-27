async function UpdateService(id, serviceData) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');

    const response = await fetch(`${backendApi}servicegifts/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(serviceData)
    })

    const data = await response.json();

    return data;
}

export default UpdateService;