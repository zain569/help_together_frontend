async function GetUpdates() {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');

    const response = await fetch(`${backendApi}update`);

    const data = await response.json();

    return data;
}

export default GetUpdates;