async function GetCampaign(id) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const response = await fetch(`${backendApi}campaigns/${id}`);

    if (!response.ok) throw new Error('Campaign details fetch failed');

    return response.json();
}

export default GetCampaign;