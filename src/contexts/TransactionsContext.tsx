import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
    id: string
    name: string
    category: string
    type: "income" | "outcome"
    price: number
    created_at: string
}

interface CreateTransactionsInput {
    name: string
    category: string
    type: "income" | "outcome"
    price: number
}

interface TransactionContextType {
    transactions: Transaction[]
    fetchTransactions: (query?: string) => Promise<void>
    createTransaction: (data: CreateTransactionsInput) => Promise<void>
}

interface TransactionsProviderProps {
    children: ReactNode
}



export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function fetchTransactions(query?: string) {
        let response = await api.get("/transactions")
        
        if(query){
            response = await api.get("/transactions/findByName", {
                params: {
                    name: query
                }
            })
        }

        setTransactions(response.data)
    }
    
    async function createTransaction(data: CreateTransactionsInput){
        const { name, category, type, price } = data

        const response = await api.post("/transactions/create", {
            name,
            category,
            type,
            price
        })

        setTransactions(state => [response.data, ...transactions])
    }

    useEffect(() => {
        fetchTransactions()
    },[])
    
    return (
        <TransactionsContext.Provider value={{ 
            transactions,
            fetchTransactions,
            createTransaction
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}