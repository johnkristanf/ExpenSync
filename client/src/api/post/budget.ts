import { AddBudgetType } from "@/types/budgets";

export const addNewBudget = async (budgetData: AddBudgetType): Promise<Response> => {
    const response = await fetch('http://localhost:3000/dev/budgets/add', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(budgetData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add budget');
    }

    return response.json();
};



