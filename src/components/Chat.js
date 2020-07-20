import React from "react"
import { ThemeProvider } from "styled-components"
import ChatBot from "react-simple-chatbot"

const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica",
    headerBgColor: "#EF6C00",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#EF6C00",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
}

const Chat = () => {
    const [state, setState] = React.useState({
        loaded: false,
        steps: [
            {
                id: "1",
                message: "What is your name?",
                trigger: "2",
            },
            {
                id: "2",
                user: true,
                trigger: "3",
            },
            {
                id: "3",
                message: "Hi {previousValue}, nice to meet you!",
                trigger: "4",
            },
            {
                id: "4",
                message: "Would you like to hear a joke?",
                trigger: "5",
            },
            {
                id: "5",
                options: [
                    { value: 1, label: "Yes", trigger: "6" },
                    { value: 2, label: "No", trigger: "7" },
                ],
            },
            {
                id: "6",
                message: "Insert joke",
                end: true,
            },
            {
                id: "7",
                message: "Okay, come back anytime!",
                end: true,
            },
        ],
    })

    React.useEffect(() => {
        handleFetch()
    })

    const handleFetch = async () => {
        let newJoke = ""

        await fetch("http://api.icndb.com/jokes/random")
            .then((res) => res.json())
            .then((data) => {
                if (data.type !== "success") {
                    return false
                }
                console.log("data", data)
                newJoke = data.value.joke
            })

        let newSteps = state.steps

        newSteps[5].message = newJoke

        setState({ ...state, steps: newSteps, loaded: true })
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                {state.loaded && <ChatBot steps={state.steps} />}
            </ThemeProvider>
        </div>
    )
}

export default Chat
