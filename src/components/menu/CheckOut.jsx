import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { AccInfoContext } from "../providers/AccInfoProvider";
import CircularProgress from "@mui/material/CircularProgress";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://quip.com/i2xLAIlyqeGy">
        SCLab
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["配送先入力", "お支払い情報", "注文状況確認"];

// ステップフロー
const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
};

const theme = createTheme();

export default function Checkout() {
  // コンテキスト
  const AccInfoContextVal = React.useContext(AccInfoContext);

  // ステート
  // ステップフロー
  const [activeStep, setActiveStep] = React.useState(0);
  const [accId, setAccId] = React.useState("");
  const [isProgress, setIsProgress] = React.useState(false);

  // 関数
  // ステップを進める
  const handleNext = async (e) => {
    setActiveStep((prevValue) => prevValue + 1);
    if (e.target.textContent === "注文する") {
      accRegisterHandler();
    }
  };

  // ステップを戻す
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // 取引先登録処理
  const accRegisterHandler = async () => {
    try {
      setIsProgress((prevValue) => !prevValue);
      const result = await axios.post(
        " http://localhost:5000/api/accounts/create",
        AccInfoContextVal
      );
      console.log("取引先レコード", result);
      setAccId(result.data.id);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsProgress((prevValue) => !prevValue);
      }, 1500);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="primary"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <FavoriteIcon
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          ></FavoriteIcon>
          <Typography variant="h6" color="inherit" noWrap>
            SCLab
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            お客さま情報
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                {isProgress ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress />
                  </div>
                ) : (
                  <>
                    <Typography variant="h5" gutterBottom sx={{ pt: 4, pb: 5 }}>
                      ご注文いただきありがとうございました
                    </Typography>
                    <Typography variant="subtitle1">
                      注文番号「{`${accId}`}」にてご注文承りました。
                    </Typography>
                  </>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    // 戻るボタン
                    <Button
                      id="test"
                      onClick={handleBack}
                      variant="outlined"
                      sx={{ mt: 3, ml: 1 }}
                    >
                      戻る
                    </Button>
                  )}
                  {/* 進行ボタン */}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "注文する" : "次へ"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
