import { app } from "./app";


app.listen(3000, ({ hostname, port }) => {
    console.log(`API Bun rodando em http://${hostname}:${port}`)
})