
export const loginWithGoogle = async () => {
    try {

        const response = await fetch('http://localhost:8000/auth/google', {
            method: 'GET',
            credentials: 'include', 
        });

        const res = await response.json();
        console.log('res login: ', res)

    } catch (error) {
        console.error('Login failed', error);
    }
};