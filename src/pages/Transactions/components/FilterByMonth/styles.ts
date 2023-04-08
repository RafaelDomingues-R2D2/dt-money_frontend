import styled from "styled-components";

export const Months = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const STATUS_BACKGROUND = {
    green: "green-500",
    gray: "gray-800",
} as const

const STATUS_COLOR = {
    green: "green-300",
    gray: "gray-100",
} as const

interface StatusProps {
    statusBackground: keyof typeof STATUS_BACKGROUND
    statusColor: keyof typeof STATUS_COLOR
}

export const Month = styled.button<StatusProps>`
    background: ${props => props.theme[STATUS_BACKGROUND[props.statusBackground]]};
    color: ${props => props.theme[STATUS_COLOR[props.statusColor]]};

    border-style: none;
    border-radius: 4px;
    padding: 0.5rem;
    margin: 1.5rem 0.5rem;

    cursor: pointer;

    :hover {
        background-color: ${props => props.theme["green-500"]};
        color: ${props => props.theme["gray-100"]};
    }
`

