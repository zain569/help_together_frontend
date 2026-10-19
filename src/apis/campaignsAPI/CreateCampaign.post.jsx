async function CreateCampaign(campaignData) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');

    const formData = new FormData();

    formData.append("title", campaignData.title)
    formData.append("description", campaignData.description)
    formData.append("goalAmount", campaignData.goalAmount)
    formData.append("zakatEligible", campaignData.zakatEligible)
    formData.append("sadaqah", campaignData.sadaqah)
    formData.append("urgent", campaignData.urgent)
    formData.append("causeId", campaignData.causeId)
    formData.append("image", campaignData.image)
    if (campaignData.startDate) formData.append("startDate", campaignData.startDate)
    if (campaignData.endDate) formData.append("endDate", campaignData.endDate)

    const response = await fetch(`${backendApi}campaigns`, {
        method: 'POST',
        credentials: 'include',
        body: formData
    });

    const data = response.json();

    return data;

}

export default CreateCampaign;