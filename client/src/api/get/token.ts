
export const setCSRFToken = async () => {
    try {
        const response = await fetch('http://localhost:8000/sanctum/csrf-cookie', {
            method: 'GET',
            credentials: 'include', 
        });

        if (response.ok) {
            console.log('CSRF cookie set');
        } else {
            console.error('Failed to set CSRF token');
        }
    } catch (error) {
        console.error('Error setting CSRF token:', error);
    }
};
