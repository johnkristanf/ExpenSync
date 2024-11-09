import { RegistrationData, SignInCredentials } from "@/types/auth";

export const registerUser = async (userData: RegistrationData): Promise<Response> => {
    return fetch('http://localhost:3000/dev/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
}



export const signInUser = async (userData: SignInCredentials): Promise<Response> => {
    return fetch('http://localhost:3000/dev/auth/signin', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};
