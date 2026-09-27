async function AdminDashBoard() {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const response = await fetch(`${backendApi}admin/dashboard`, {
        credentials: "include"
    });

    const data = await response.json();

    return data;
}

export default AdminDashBoard;
