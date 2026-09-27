async function UpdateCampaignStatus(id, status) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    if (status === 'published') {
        const sts = 'publish'
        const response = await fetch(`${backendApi}campaigns/${sts}/${id}`, {
            credentials: 'include',
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = response.json();

        return data;
    } else if (status === 'archived') {
        const sts = 'archive'
        const response = await fetch(`${backendApi}campaigns/${sts}/${id}`, {
            credentials: 'include',
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = response.json();

        return data;
    } else if (status === 'funded') {
        const sts = 'funded'
        const response = await fetch(`${backendApi}campaigns/${sts}/${id}`, {
            credentials: 'include',
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = response.json();

        return data;
    }
}

export default UpdateCampaignStatus;