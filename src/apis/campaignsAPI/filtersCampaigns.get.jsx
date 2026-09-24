async function FilteredCampaigns(options = {}) {
    const { causeId = '', zakatEligible = false, urgent = false } = options;
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const params = new URLSearchParams();

    if (causeId) params.set('causeId', String(causeId));
    if (zakatEligible) params.set('zakatEligible', 'true');
    if (urgent) params.set('urgent', 'true');

    const response = await fetch(`${backendApi}campaigns/filter?${params}`);

    const data = await response.json();

    return data;

}

export default FilteredCampaigns;