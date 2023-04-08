import { useContextSelector } from "use-context-selector"
import { TransactionsContext } from "../../../../contexts/TransactionsContext"
import { Month, Months } from "./styles"
import { useState } from "react"

export function FilterByMonth(){
    const date = new Date()
    const [actived, setActived] = useState(date.getUTCMonth()) 

    const fetchTransactions = useContextSelector(TransactionsContext, context => {
        return context.fetchTransactions
    })
    
    async function handleFilter(month: number){
        await fetchTransactions(month)

        setActived(month)
    } 

    const months = [
        {
            code: 0,
            name: "Janeiro",
            abbreviation: "Jan",
        },
        {
            code: 1,
            name: "Fevereiro",
            abbreviation: "Fev",
        },
        {
            code: 2,
            name: "Março",
            abbreviation: "Mar",
        },
        {
            code: 3,
            name: "Abril",
            abbreviation: "Abr",
        },
        {
            code: 4,
            name: "Maio",
            abbreviation: "Mai",
        },
        {
            code: 5,
            name: "Junho",
            abbreviation: "Jun",
        },
        {
            code: 6,
            name: "Julho",
            abbreviation: "Jul",
        },
        {
            code: 7,
            name: "Agosto",
            abbreviation: "Ago",
        },
        {
            code: 8,
            name: "Setembro",
            abbreviation: "Set",
        },
        {
            code: 9,
            name: "Outubro",
            abbreviation: "Out",
        },
        {
            code: 10,
            name: "Novembro",
            abbreviation: "Nov",
        },
        {
            code: 11,
            name: "Dezembro",
            abbreviation: "Dez",
        },
    ]

    return (
        <Months>
            {months.map(month => {
                console.log(actived, month.code)
                return (
                    <Month 
                        key={month.code}
                        value={month.code}
                        title={month.name}
                        onClick={() => handleFilter(month.code)}
                        statusBackground={actived === month.code ? "green" : "gray"}
                        statusColor={actived === month.code ? "gray" : "green"}
                    >
                        {month.abbreviation}
                    </Month>
                )
            })}
        </Months>
    )
}