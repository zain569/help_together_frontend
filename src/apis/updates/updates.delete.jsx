async function DeleteUpdates(id) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');

    const response = await fetch(`${backendApi}update/${id}`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    return data;
}

export default DeleteUpdates;