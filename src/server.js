import app from "./app";
import "dotenv/config";

const PORT = process.env.PORT;

app.listen(PORT, err => {
    if (err) console.error(err);
    console.log(`Listen port ${PORT}.`);
});