import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { PaymentInfoContext } from "../providers/PaymentInfoProvider";
import { UserInfoContext } from "../providers/UserInfoProvider";
import { AccInfoContext } from "../providers/AccInfoProvider";

const products = [
  {
    name: "MONSTER HUNTER RISE: SUNBREAK",
    desc: "『モンスターハンターライズ』待望の新作！",
    price: "5500円",
  },
];

export default function Review() {
  // コンテキスト
  const payInfoContextVal = React.useContext(PaymentInfoContext);
  const { cardNumber, expDate } = payInfoContextVal.payInfo;
  const accInfoContextVal = React.useContext(AccInfoContext);
  const userInfoContextVal = React.useContext(UserInfoContext);

  const { firstName, lastName, phone, postCode, state, city, street } =
    accInfoContextVal.accInfo;

  const shipInfo = {
    addresses: [`${state}県`, `${city}市`, `${street}`].join(""),
    fullName: lastName + " " + firstName,
    phone,
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        ご注文内容
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="合計" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            5500円
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            配送先
          </Typography>
          <Typography gutterBottom>氏名 : {shipInfo.fullName}</Typography>
          <Typography gutterBottom>住所 : {shipInfo.addresses}</Typography>
          <Typography gutterBottom>連絡先 : {shipInfo.phone}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            請求情報
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>カード種別</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Visa</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>カード番号</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{cardNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>有効期限</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{expDate}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
