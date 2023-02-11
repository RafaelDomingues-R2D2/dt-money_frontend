import { createContext, ReactNode, useEffect, useState } from "react";

interface Transaction {
    id: string
    description: string
    category: string
    type: "income" | "outcome"
    price: number
    created_at: string
}

interface TransactionContextType {
    transactions: Transaction[]
}

interface TransactionsProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function loadTransactions() {
        const response = await fetch("http://localhost:3001/transactions")
        const data = await response.json()

        setTransactions(data)
    }
    
    useEffect(() => {
        loadTransactions()
    },[])
    
    return (
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}