async function UpdateFAQs(id, updateData) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const response = await fetch(`${backendApi}faq/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            question: updateData.question,
            answer: updateData.answer,
            isActive: updateData.isActive
        })
    });

    const data = response.json();

    return data;
}

export default UpdateFAQs;