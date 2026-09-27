async function CreateFAQs( createFAQsData ) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const response = await fetch(`${backendApi}faq`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            question: createFAQsData.question,
            answer: createFAQsData.answer
         })
    });

    const data = response.json();

    return data;
}

export default CreateFAQs;