import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { AccInfoContext } from "../providers/AccInfoProvider";

export default function AddressForm() {
  // コンテキスト
  const accInfoContextVal = React.useContext(AccInfoContext);
  const {
    accInfo: {
      lastName,
      firstName,
      phone,
      emali,
      country,
      postCode,
      state,
      street,
      city,
    },
    setAccInfo,
  } = accInfoContextVal;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom></Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="姓"
            fullWidth
            autoComplete="family-name"
            value={lastName}
            onChange={(e) =>
              setAccInfo({
                ...accInfoContextVal.accInfo,
                lastName: e.target.value,
              })
            }
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="名"
            fullWidth
            autoComplete="given-name"
            value={firstName}
            onChange={(e) =>
              setAccInfo({
                ...accInfoContextVal.accInfo,
                firstName: e.target.value,
              })
            }
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="電話番号"
            fullWidth
            autoComplete="given-phone"
            variant="standard"
            value={phone}
            onChange={(e) =>
              setAccInfo({
                ...accInfoContextVal.accInfo,
                phone: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="emali"
            name="emali"
            label="メールアドレス"
            fullWidth
            autoComplete="given-mail"
            variant="standard"
            value={emali}
            onChange={(e) =>
              setAccInfo({
                ...accInfoContextVal.accInfo,
                email: e.target.value,
              })
            }
          />
        </Grid>
        {/* <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="住所"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid> */}

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="国"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value={country}
            onChange={(e) =>
              setAccInfo({
                ...accInfoContextVal.accInfo,
                country: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="郵便番号"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={postCode}
            onChange={(e) =>
              setAccInfo({
                ...accInfoContextVal.accInfo,
                postCode: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="都道府県"
            fullWidth
            variant="standard"
            value={state}
            onChange={(e) =>
              setAccInfo({
                ...accInfoContextVal.accInfo,
                state: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="市区郡"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={city}
            onChange={(e) =>
              setAccInfo({
                ...accInfoContextVal.accInfo,
                city: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="street"
            name="street"
            label="町名・番地"
            fullWidth
            autoComplete="shipping street"
            variant="standard"
            value={street}
            onChange={(e) =>
              setAccInfo({
                ...accInfoContextVal.accInfo,
                street: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="この住所をお支払い先へ登録する"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
