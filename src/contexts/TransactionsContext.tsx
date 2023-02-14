import { createContext, ReactNode, useEffect, useState } from "react";

interface Transaction {
    id: string
    name: string
    category: string
    type: "income" | "outcome"
    price: number
    created_at: string
}

interface TransactionContextType {
    transactions: Transaction[]
    fetchTransactions: (query?: string) => Promise<void>
}

interface TransactionsProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function fetchTransactions(query?: string) {
        const url = new URL("http://localhost:3001/transactions")

        if(query){
            const url = new URL("http://localhost:3001/transactions/findByName")
            url.searchParams.append("name", query)
        }

        const response = await fetch(url)
        const data = await response.json()

        setTransactions(data)
    }
    
    useEffect(() => {
        fetchTransactions()
    },[])
    
    return (
        <TransactionsContext.Provider value={{ 
            transactions,
            fetchTransactions 
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}