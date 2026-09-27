async function CreateCause(causeData) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const formData = new FormData();

    formData.append("name", causeData.name);
    formData.append("description", causeData.description);
    formData.append("slug", causeData.slug);
    formData.append("displayOrder", causeData.displayOrder);
    formData.append("isActive", causeData.isActive);

    if (causeData.image) {
        formData.append("image", causeData.image);
    }
    const response = await fetch(`${backendApi}causes`, {
        method: 'POST',
        credentials: 'include',
        body: formData
    });

    const data = response.json();

    return data;
}

export default CreateCause;