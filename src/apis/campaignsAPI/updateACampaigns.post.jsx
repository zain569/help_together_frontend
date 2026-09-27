async function UpdateCampaign(campaignData, id) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');

    const response = await fetch(`${backendApi}campaigns/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(campaignData)
    })

    const data = response.json();

    return data;
}

export default UpdateCampaign;