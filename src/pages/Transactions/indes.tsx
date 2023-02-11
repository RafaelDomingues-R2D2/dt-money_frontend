import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./SerachForm";
import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";

interface Transaction {
    id: string
    description: string
    category: string
    type: "income" | "outcome"
    price: number
    created_at: string
}

export function Transactions(){
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
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />
                <TransactionsTable>
                   <tbody>
                    {transactions.map(transaction => {
                        return (
                            <tr key={transaction.id}>
                                <td width="58%">{transaction.description}</td>
                                <td>
                                    <PriceHighLight variant={transaction.type}>
                                        {transaction.price}
                                    </PriceHighLight>
                                </td>
                                <td>{transaction.category}</td>
                                <td>{transaction.created_at}</td>
                            </tr>
                        )
                    })}
                   </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}