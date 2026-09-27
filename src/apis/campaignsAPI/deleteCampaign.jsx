async function DeleteCampaign(id) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const response = await fetch(`${backendApi}campaigns/${id}`, {
        credentials: 'include',
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json();

    return data;
}

export default DeleteCampaign;