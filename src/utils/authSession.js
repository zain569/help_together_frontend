const AUTH_STORAGE_KEY = 'help_together_auth';

export function normalizeUser(rawUser = {}) {
    const user = rawUser || {};
    const firstName = user.firstname || user.fname || user.firstName || '';
    const lastName = user.lastname || user.lname || user.lastName || '';
    const displayName = [firstName, lastName].filter(Boolean).join(' ') || 'User';

    return {
        id: user.id || user._id || '',
        firstname: firstName,
        lastname: lastName,
        firstName,
        lastName,
        email: user.email || '',
        role: user.role || 'user',
        profileimage: user.profileimage || user.imageurl || user.profileImage || '',
        imageurl: user.imageurl || user.profileimage || user.profileImage || '',
        displayName,
    };
}

export function readAuthSession() {
    try {
        const storedValue = localStorage.getItem(AUTH_STORAGE_KEY);
        if (!storedValue) return null;

        const parsed = JSON.parse(storedValue);
        if (!parsed) return null;

        const user = normalizeUser(parsed.user || {});
        return {
            token: parsed.token || localStorage.getItem('token') || '',
            user,
            isUser: parsed.isUser ?? Boolean(user.id),
        };
    } catch (error) {
        console.error('Failed to read auth session:', error);
        return null;
    }
}

export function saveAuthSession(payload = {}) {
    const rawUser = payload.user || {};
    const normalizedUser = normalizeUser(rawUser);
    const session = {
        token: payload.token || localStorage.getItem('token') || '',
        user: normalizedUser,
        isUser: payload.isUser ?? Boolean(normalizedUser.id || payload.token),
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));

    if (session.token) {
        localStorage.setItem('token', session.token);
    }

    if (session.user.id) {
        localStorage.setItem('userId', session.user.id);
    }

    if (session.user.email) {
        localStorage.setItem('userEmail', session.user.email);
    }

    if (session.user.profileimage || session.user.imageurl) {
        localStorage.setItem('userProfileImage', session.user.profileimage || session.user.imageurl);
    }

    if (session.user.displayName) {
        localStorage.setItem('userName', session.user.displayName);
    }

    window.dispatchEvent(new CustomEvent('auth:change', { detail: session }));
    return session;
}

export function clearAuthSession() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userProfileImage');
    localStorage.removeItem('userName');
    window.dispatchEvent(new CustomEvent('auth:change', { detail: null }));
}
