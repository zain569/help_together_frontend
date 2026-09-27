async function UpdateCause(id, updateddata) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const response = await fetch(`${backendApi}causes/${id}`, {
        credentials: 'include',
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateddata)
    })

    const data = await response.json();

    return data;
}

export default UpdateCause;