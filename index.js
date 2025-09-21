import { GoogleGenAI } from "@google/genai";

import 'dotenv/config';
import express from "express";
import multer from "multer";
import fs from "fs/promises";
import cors from "cors";

const app = express();
const upload = multer();
const ai = new GoogleGenAI({});

//Inisialisasi Model AI
const geminiModels = {
  text: "gemini-2.5-flash-lite",
  image: "gemini-2.5-flash",
  audio: "gemini-2.5-flash-lite",
  document: "gemini-2.5-flash-lite"
};

//inisialisasi aplikasi back-end/server
app.use(cors()); // .use() --> panggil/bikin middleware
app.use(express.json()); // untuk membolehkan kita menggunakan 'Content-type: application/json' di header

// inisialisasi rout
// .get(), .post(), .put(), .patch(), .delete () --> Sering dipakai
// .option() --> lebih jarang diapakai, karena lebih ke flashlight (untuk CORS umumnya)

app.post('/generate-text', async (req, res) => {
  //handle bagaiamana request diterima oleh user
  // const { body } = req; // object distructuring

  // // guard clause --> satpam
  // if (!body) {
  //   // jika body0nya tidak ada isinya
  //   res.status(400).send("Tidak ada payload yang dikirim!");
  //   return;
  // }

  // // satpam untuk cek tipe data dari body-nya
  // // req.body = [] // typeof --> object; Array.isArray(isi) //true
  // // req.body = {} // tupeof --> object; Array.isArray(isi) //false
  // if (typeof body !== 'object') {
  //   res.status(400).send("Tipe payload-nya tidak sesuai");
  //   return;
  // }

  const { message } = req.body || {};

  if (!message || typeof message != 'string') {
    res.status(400).send('Pesan tidak ada atau format-nya tidak sesuai.');
    return; // keluar lebih awal dari handler
  }

  const response = await ai.models.generateContent({
    contents: message,
    model: geminiModels.text
  });

  res.status(200).send({
    reply: response.text
  });
  
});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Hai Gemini",
//   });
//   console.log(response.text);
// }

// await main();

// panggil app-nya disini
const port = 3000;

app.listen(port, () => {
  console.log("I LOVE YOU", port);
});
