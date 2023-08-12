import app from "./app";
import dbConn from "./configs/configs.dbConn";

const PORT = process.env.PORT || 500;

app.get("/health-check", (req, res) => {
  res.send("Health status - all good");
});

// Default catch all route - 404
app.all("*", (req, res) => {
  res.send("OOPS!!!! 404 Not found");
});

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
  dbConn();
});
