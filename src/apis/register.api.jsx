async function RegisterUserApi(RegisterUserData, image) {
    const backendApi = (import.meta.env.VITE_BACKEND_API || '').replace(/\/?$/, '/');
    const formData = new FormData();

    formData.append('firstname', RegisterUserData.firstName || RegisterUserData.firstname || '');
    formData.append('lastname', RegisterUserData.lastName || RegisterUserData.lastname || '');
    formData.append('email', RegisterUserData.email || '');
    formData.append('password', RegisterUserData.password || '');
    formData.append('role', 'user');

    if (image) {
        formData.append('image', image);
    }

    const response = await fetch(`${backendApi}auth/register`, {
        method: 'POST',
        credentials: 'include',
        body: formData
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data?.message || 'Register failed');
    }

    return data;
}

export default RegisterUserApi;