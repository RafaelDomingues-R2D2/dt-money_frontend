import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector"
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

    const fetchTransactions = useCallback(async (month: number, name?: string) => {
        const response = await api.get("/transactions", {
            params: {
                month: month,
                name: name,
            }
        })

        setTransactions(response.data["transactions"])
    }, [])
    
    const createTransaction = useCallback(async (data: CreateTransactionsInput) => {
        const { name, category, type, price } = data

        const response = await api.post("/transactions/create", {
            name,
            category,
            type,
            price
        })

        setTransactions(state => [response.data["transactions"], ...transactions])
    }, [])

    useEffect(() => {
        const date = new Date()
        fetchTransactions(date.getUTCMonth())
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