async function FundedCampaignsApi() {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');

    const response = await fetch(`${backendApi}campaigns/funded_campaigns`);

    const data = response.json()

    return data;
}

export default FundedCampaignsApi;