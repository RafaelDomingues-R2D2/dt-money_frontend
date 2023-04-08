import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./styles";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const searchFormSchema = z.object({
    name: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm(){
    const fetchTransactions = useContextSelector(TransactionsContext, context =>{
        return context.fetchTransactions
    })

    const { 
        register,
        handleSubmit, 
        formState: { isSubmitting } 
    } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    })

    async function handleSearchTransactions(data: SearchFormInputs){
        await fetchTransactions(20, data.name)
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input 
                type="text" 
                placeholder="Busque por transações" 
                {...register("name")}
            />

            <button type="submit" disabled={ isSubmitting }>
                <MagnifyingGlass size={28} />
                Buscar
            </button>
        </SearchFormContainer>
    )
}