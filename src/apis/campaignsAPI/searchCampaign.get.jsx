async function SearchCampaign(query) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const response = await fetch(`${backendApi}campaigns/search?title=${query}`);

    const data = await response.json();

    return data;
}

export default SearchCampaign;