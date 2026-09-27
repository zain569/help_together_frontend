async function GetAllFAQs() {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');

    const response = await fetch(`${backendApi}faq`,{
        method: 'GET',
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error(`FAQ request failed with status ${response.status}`);
    }

    const data = await response.json();

    return data;
}

export default GetAllFAQs;