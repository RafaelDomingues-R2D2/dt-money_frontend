import * as Dialog  from "@radix-ui/react-dialog";
import * as RadioGroup from '@radix-ui/react-radio-group'

import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { ClosseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";

export function NewTransactionModal(){
    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>

                <ClosseButton>
                    <X />
                </ClosseButton>


                <form action="">
                    <input type="text" placeholder="Descrição" required/>
                    <input type="number" placeholder="Preço" required/>
                    <input type="text" placeholder="Categoria" required/>

                    <TransactionType>
                        <TransactionTypeButton variant="income" value="income">
                            <ArrowCircleUp size={24}/> 
                            Entrada
                        </TransactionTypeButton>

                        <TransactionTypeButton variant="outcome" value="outcome">
                            <ArrowCircleDown size={24}/> 
                            Saída
                        </TransactionTypeButton>
                    </TransactionType>

                    <button type="submit">
                        Cadastrar
                    </button>
                </form>

            </Content>
        </Dialog.Portal>  
    )
}