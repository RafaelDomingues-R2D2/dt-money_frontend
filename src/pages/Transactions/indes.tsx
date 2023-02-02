import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./SerachForm";
import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";

export function Transactions(){
    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />
                <TransactionsTable>
                    <tr>
                        <td width="58%">Desenvolvimento de site</td>
                        <td>
                            <PriceHighLight variant="income">
                                R$ 12.000,00
                            </PriceHighLight>
                        </td>
                        <td>Venda</td>
                        <td>13/04/2022</td>
                    </tr>
                    <tr>
                        <td width="58%">Hamburguer</td>
                        <td>
                            <PriceHighLight variant="outcome">
                                - R$ 59,00
                            </PriceHighLight>
                        
                        </td>
                        <td>Alimentação</td>
                        <td>15/04/2022</td>
                    </tr>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}