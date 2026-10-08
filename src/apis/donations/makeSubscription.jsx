async function MakeSubscriptions(subscriptionData) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');

    const response = await fetch(`${backendApi}donation/subscribe`, {
        credentials: 'include',
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            frequency: subscriptionData.frequency,
            subscriptionType: subscriptionData.subscriptionType
        })
    });

    const data = response.json();

    return data;
}

export default MakeSubscriptions;