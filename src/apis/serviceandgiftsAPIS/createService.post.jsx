async function CreateService(serviceData) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');

    const formData = new FormData();

    formData.append("name", serviceData.name)
    formData.append("description", serviceData.description)
    formData.append("price", serviceData.price)
    formData.append("isActive", serviceData.isActive)

    if (serviceData.image) {
        formData.append("image", serviceData.image)
    };

    const response = await fetch(`${backendApi}servicegifts`, {
        method:'POST',
        credentials: 'include',
        body: formData
    })

    const data = await response.json();

    return data;
}

export default CreateService;