import { useContextSelector } from "use-context-selector";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { FilterByMonth } from "./components/FilterByMonth";
import { SearchForm } from "./components/SearchForm";
import { ButtonDelete, PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";
import { api } from "../../lib/axios";
import { Trash } from "phosphor-react";

export function Transactions(){
    const transactions = useContextSelector(TransactionsContext, context => {
        return context.transactions
    })

    const fetchTransactions = useContextSelector(TransactionsContext, context =>{
        return context.fetchTransactions
    })

    function handleDeleteTransaction(id: string){
        api.delete(`/transactions/${id}/delete`)
    }

    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <FilterByMonth />
                <SearchForm />
                <TransactionsTable>
                   <tbody>
                    {transactions.map(transaction => {
                        return (
                            <tr key={transaction.id}>
                                <td width="58%">{transaction.name}</td>
                                <td>
                                    <PriceHighLight variant={transaction.type}>
                                        {transaction.type === "outcome" && "- "}
                                        {priceFormatter.format(transaction.price)}
                                    </PriceHighLight>
                                </td>
                                <td>{transaction.category}</td>
                                <td>{dateFormatter.format(new Date(transaction.created_at))}</td>
                                <td><ButtonDelete onClick={() => handleDeleteTransaction(transaction.id)}><Trash size={20} /></ButtonDelete></td>
                            </tr>
                        )
                    })}
                   </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}