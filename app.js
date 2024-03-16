require("dotenv").config();
const express = require("express");
const {
  logErrors,
  clientErrorHandler
} = require("./errorHandlers");

const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

const innerMessage = 'Lina';

mas=["A","B","C"]

async function main({age, pills, sex, illnesses, message}) {
  const query = `user of age ${age} sex - ${sex} with ${illnesses}, take such pills: ${pills}, give answer for next question: ${message}`;
  console.log(query);
  const completion = await openai.chat.completions.create({
    messages: [
      {role: "system", content: query
      }
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
  console.log(completion.choices[0].message.content);
  return (completion.choices[0].message.content)
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/message", (req, res, next) => {
  try {
    res.send("Message from server");
  } catch (e) {
    next(e);
  }
});
app.post("/message", async (req, res, next) => {
  try {
    console.log(req.body.message);
    const age = req.body.age;
    const pills = req.body.pills;
    const sex = req.body.sex;
    const illnesses = req.body.illnesses;
    const message = req.body.message;

    res.json({answer: await main({age, pills, sex, illnesses, message})});
    // res.send(`Your message: ${req.body.message}`);
  } catch (e) {
    next(e);
  }
});

app.get('/user',(req,res)=>{
  res.send('Illia Yatsentyuk!')
})

app.get('/test',(req,res)=>{
  res.send('Illia Yatsentyuk!')
})

app.get('/test/1',(req,res)=>{
  res.send(mas[0])
})

app.get('/test/2',(req,res)=>{
  res.send(mas[1])
})

app.get('/test/3',(req,res)=>{
  res.send(mas[2])
})

app.get('/test/*',(req,res)=>{
  res.send('Page not found!')
})

app.get('*',(req,res)=>{
  res.send('Page not found!')
})


app.use(logErrors);
app.use(clientErrorHandler);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
