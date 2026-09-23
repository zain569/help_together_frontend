async function GetRiews() {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const response = await fetch(`${backendApi}testimonial`);

    const data = await response.json();

    return data;
}

export default GetRiews;