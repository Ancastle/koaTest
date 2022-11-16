const Koa = require("koa");
const app = new Koa();

const PORT = 5000;

app.use(async (ctx) => {
  ctx.body = "Hello World from Railway";
});

app.listen(process.env.PORT || PORT, () => console.log("Sever running"));
