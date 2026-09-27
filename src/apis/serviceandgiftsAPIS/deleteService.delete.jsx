async function DeleteService(id) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');

    const response = await fetch(`${backendApi}servicegifts/${id}`, {
        credentials: 'include',
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json();

    return data;
}

export default DeleteService;