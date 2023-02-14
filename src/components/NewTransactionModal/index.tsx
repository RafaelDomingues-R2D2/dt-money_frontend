import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog  from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, FileDoc, X } from "phosphor-react";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod"
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { api } from "../../lib/axios";

import { ClosseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";

const newTransactionFormSchema = z.object({
    name: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(["income", "outcome"])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal(){
    const { createTransaction } = useContext(TransactionsContext)
    
    const { 
        control,
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: "income"
        }
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs){
        const { name, category, type, price } = data
        
        await createTransaction({
            name,
            category,
            type,
            price
        })
    
        reset()
    }

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>

                <ClosseButton>
                    <X size={24} />
                </ClosseButton>


                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input 
                        type="text" 
                        placeholder="Descrição" 
                        required
                        {...register("name")}
                        
                    />
                    <input 
                        type="number"
                        placeholder="Preço"
                        required
                        {...register("price", { valueAsNumber: true})}
                    />
                    <input
                        type="text"
                        placeholder="Categoria"
                        required
                        {...register("category")}
                    />

                    <Controller
                        control={control}
                        name="type"
                        render={({field }) => {
                            console.log(field)
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton variant="income" value="income">
                                        <ArrowCircleUp size={24}/> 
                                        Entrada
                                    </TransactionTypeButton>

                                    <TransactionTypeButton variant="outcome" value="outcome">
                                        <ArrowCircleDown size={24}/> 
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />

                    <button type="submit" disabled={ isSubmitting }>
                        Cadastrar
                    </button>
                </form>

            </Content>
        </Dialog.Portal>  
    )
}