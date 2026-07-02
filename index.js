import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";


const yourBearerToken = "13c85498-238a-4982-abb8-30fbba954095";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
   const {secret, score} = req.body;
  try{
    const response = await axios.post(API_URL + "/secrets/", {
       "secret":secret,
        "score": score
    }, config)
     res.render("index.ejs", { content: JSON.stringify(response.data) });
  }
  catch(err){
     res.render("index.ejs", { content: JSON.stringify(err.response.data) });
  }
});

app.post("/put-secret", async (req, res) => {
  console.log(req.body)
  const {id, secret, score} = req.body;
  console.log(id + secret + score)
  try {
    const response = await axios.put(API_URL + "/secrets/" + id, {
     "secret":secret,
      "score": score 
    }, config)
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
     res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/patch-secret", async (req, res) => {
  const {id, secret, score} = req.body;
  try {
    const response = await axios.put(API_URL + "/secrets/" + id, {
     "secret":secret,
      "score": score 
    }, config)
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
     res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try{
    const response= await axios.delete(API_URL + "/secrets/" + searchId,config )
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  }
  catch(err){
    res.render("index.ejs", { content: JSON.stringify(err.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
