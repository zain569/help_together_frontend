async function GetAllCauses() {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const response = await fetch(`${backendApi}causes`);

    const data = await response.json();

    return data;
}

export default GetAllCauses;