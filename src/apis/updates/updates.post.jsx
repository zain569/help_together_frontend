async function CreateUpdate(updateData) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');

    const form = new FormData();

    form.append("title", updateData.title)
    form.append("description", updateData.description)
    form.append("causeName", updateData.causeName)

    if (updateData.image) {
        form.append("image", updateData.image)
    };

    const response = await fetch(`${backendApi}update`, {
        method: 'POST',
        credentials: 'include',
        body: form
    });

    const data = await response.json();

    return data;
}

export default CreateUpdate;