async function GetMyContacts() {
    const id = localStorage.getItem('userId')
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const response = await fetch(`${backendApi}contact/mycontacts/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json()
    return data;
}

export default GetMyContacts;