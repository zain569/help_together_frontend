async function GetSubscriptionData(sessionId) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');

    const response = await fetch(`${backendApi}donation/subscriptiondata/${sessionId}`, {
        method: "GET",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || `Failed to verify subscription (${response.status})`);
    }

    return data;
}
export default GetSubscriptionData;