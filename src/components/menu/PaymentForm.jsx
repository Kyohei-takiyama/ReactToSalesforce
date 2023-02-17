import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { PaymentInfoContext } from "../providers/PaymentInfoProvider";

export default function PaymentForm() {
  // コンテキスト
  const contextPayInfo = React.useContext(PaymentInfoContext);
  const { payInfo, setPayInfo } = contextPayInfo;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="カード名"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={payInfo.cardName}
            onChange={(e) =>
              setPayInfo({ ...payInfo, cardName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="カード番号"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={payInfo.cardNumber}
            onChange={(e) =>
              setPayInfo({ ...payInfo, cardNumber: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="有効期限"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value={payInfo.expDate}
            onChange={(e) =>
              setPayInfo({ ...payInfo, expDate: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="カード裏の3桁の番号"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value={payInfo.cvv}
            onChange={(e) => setPayInfo({ ...payInfo, cvv: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="次回も同じカード情報を使用する"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
