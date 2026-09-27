async function ReplyUserContact(replyData) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const response = await fetch(`${backendApi}contact/${replyData.contactId}`,{
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            subject: replyData.subject,
            message: replyData.message,
            status: replyData.status,
            adminNote: replyData.adminReply
        })
    });

    const data = response.json();

    return data;
}

export default ReplyUserContact;