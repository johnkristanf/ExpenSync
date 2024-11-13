
export const getBudgets = async () => {
    const response = await fetch('http://localhost:3000/dev/budgets/get', {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get budgets');
    }

    return response.json();
}