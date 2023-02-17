const express = require("express");
const app = express();
const jsforce = require("jsforce");
let dev = require("dotenv").config();
const cors = require("cors");

// JSONをExpressで使用することを宣言
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS許可
app.use(
  cors({
    origin: "http://localhost:3000", //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200, //レスポンスstatusを200に設定
  })
);

const conn = new jsforce.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
  loginUrl: "https://svc-labo-dev-ed.my.salesforce.com/",
});

// const username = "ktakiyama@terrasky.co.jp--svc";
// const password = "Kyohei0202";

// 取引先取得
app.get("/api/accounts", (req, res) => {
  conn.query("SELECT Id, Name FROM Account", function (err, result) {
    if (err) {
      res.json(err);
    }
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    console.log("total : " + result.totalSize);
    console.log("fetched : " + result.records.length);
    res.send(result);
  });
});
// Todo取得
// app.get("/api/todos", (req, res) => {
//   conn.query("SELECT Id, Subject,IsClosed FROM Task", function (err, result) {
//     if (err) {
//       res.json(err);
//     }
//     // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//     console.log("total : " + result.totalSize);
//     console.log("fetched : " + result.records.length);
//     res.send(result);
//   });
// });

// 取引先作成
app.post("/api/accounts/create", (req, res) => {
  console.log("req.body", req.body);
  const {
    accInfo: {
      firstName,
      lastName,
      phone,
      email,
      country,
      postCode,
      state,
      city,
      street,
    },
  } = req.body;
  conn.sobject("Account").create(
    {
      Name: `${lastName + firstName}`,
      Phone: phone,
      BillingCountry: country,
      BillingPostalCode: postCode,
      BillingState: state,
      BillingCity: city,
      BillingStreet: street,
    },
    (err, result) => {
      if (err || !result.success) {
        return res.json(err);
      }
      console.log("Created record id : " + result.id);
      return res.json(result);
    }
  );
});

// 取引先更新
app.post("/api/accounts/update/:id", (req, res) => {
  const { id: Id } = req.params;
  const { name: Name } = req.body;
  conn.sobject("Account").update(
    {
      Name,
      Id,
    },
    function (err, result) {
      if (err || !result.success) {
        res.json(err);
      }
      console.log("Updated Successfully : " + result.id);
      res.json(result);
    }
  );
});

// 取引先削除
app.post("/api/accounts/delete/:id", (req, res) => {
  conn.sobject("Account").destroy(req.params.id, function (err, result) {
    if (err || !result.success) {
      res.json(err);
    }
    console.log("Deleted Successfully : " + result.id);
    res.json(result);
  });
});

// login
app.post("/api", (req, res) => {
  console.log("req.body", req.body);
  const { username, password } = req.body;
  conn.login(username, password, function (err, userInfo) {
    if (err) {
      return console.error(err);
    }
    // Now you can get the access token and instance URL information.
    // Save them to establish connection next time.
    console.log("アクセストークン : ", conn.accessToken);
    console.log("インスタンスURL", conn.instanceUrl);
    // logged in user property
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
    // ...
    return res.json({ userInfo });
  });
});

app.listen(5000, () => console.log("サーバ起動"));
