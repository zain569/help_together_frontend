async function CancelSubscription(subscriptionId) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');

    const response = await fetch(`${backendApi}donation/unsubscribe/${subscriptionId}`,{
        method: "DELETE",
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || `Failed to cancel subscription (${response.status})`);
    }

    return data;
}

export default CancelSubscription;
