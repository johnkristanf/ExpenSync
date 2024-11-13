export type AddBudgetType = {
    name: string,
    icon: string,
    period: string,
    budget: number,
    wallet_id: number,
}


export type GetBudgetType = {
    id: number,
    name: string,
    icon: string,
    period: string,
    budget: number,
    wallet_id: number,
}