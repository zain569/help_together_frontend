async function GetAllCampaigns(options = {}) {
    const request = typeof options === 'number' ? { page: options } : options;
    const { page = 1, causeId = '' } = request || {};
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const causeQuery = causeId ? `&causeId=${causeId}` : '';
    const response = await fetch(`${backendApi}campaigns?page=${page}&limit=8${causeQuery}`);

    const data = await response.json();

    return data;
}
export default GetAllCampaigns;