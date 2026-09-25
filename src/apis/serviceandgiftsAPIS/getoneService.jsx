async function GetOneService(id) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const response = await fetch(`${backendApi}servicegifts/${id}`);

    const data = await response.json();

    return data;
}

export default GetOneService;