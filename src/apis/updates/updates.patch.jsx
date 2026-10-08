async function UpdateUpdates(updatesData, id) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');

    const response = await fetch(`${backendApi}update/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatesData)
    });

    const data = await response.json();

    return data;
}

export default UpdateUpdates;