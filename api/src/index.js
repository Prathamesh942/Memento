import { app } from "./app.js"

app.listen(process.env.PORT || 3000, ()=>{ console.log("server running on port 3000")})