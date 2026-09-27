async function DeleteCause(id) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const response = await fetch(`${backendApi}causes/${id}`, {
        credentials: 'include',
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json();

    return data;
}

export default DeleteCause;