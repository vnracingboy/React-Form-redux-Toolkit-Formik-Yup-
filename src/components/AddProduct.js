import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Box,
  Snackbar,
} from "@mui/material";
import { v4 as uuid } from "uuid";

import { IMaskInput } from "react-imask";
import { Field, Form, Formik } from "formik";
import {
  TextField,
  CheckboxWithLabel,
  Select,
  RadioGroup,
  Checkbox,
} from "formik-material-ui";
import { object, number, string, boolean, array } from "yup";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/Products";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import MuiAlert from "@mui/material/Alert";

const defaultMaskOptions = {
  prefix: "",
  suffix: " VND",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ",",
  allowDecimal: true,
  decimalSymbol: ".",
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};
const CurrencyInput = ({ maskOptions, ...inputProps }) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  });

  return <MaskedInput mask={currencyMask} {...inputProps} />;
};

CurrencyInput.defaultProps = {
  inputMode: "numeric",
  maskOptions: {},
};

CurrencyInput.propTypes = {
  inputmode: PropTypes.string,
  maskOptions: PropTypes.shape({
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    includeThousandsSeparator: PropTypes.bool,
    thousandsSeparatorSymbol: PropTypes.string,
    allowDecimal: PropTypes.bool,
    decimalSymbol: PropTypes.string,
    decimalLimit: PropTypes.string,
    requireDecimal: PropTypes.bool,
    allowNegative: PropTypes.bool,
    allowLeadingZeroes: PropTypes.bool,
    integerLimit: PropTypes.number,
  }),
};
// const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
//   const { onChange, ...other } = props;
//   return (
//     <IMaskInput
//       {...other}
//       mask=",###"
//       definitions={{
//         '#': /[1-9]/,
//       }}
//       inputRef={ref}
//       onAccept={(value) => onChange({ target: { name: props.name, value } })}
//       overwrite
//     />
//   );
// });

// TextMaskCustom.propTypes = {
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddProduct() {
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //   const [values, setValues] = React.useState({
  //     textmask: '(100) 000-0000',
  //   });

  //   const handleChange = (event) => {
  //     setValues({
  //       ...values,
  //       [event.target.name]: event.target.value,
  //     });
  //   };

  return (
    
    <Card sx={{ maxWidth: 500 }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Th??m n?????c hoa th??nh c??ng!
            </Alert>
          </Snackbar>
      <CardContent>
        <Formik
          initialValues={{
            productName: "",
            price: "",
            selection: "",
            sex: "",
            style: [],
            myimg: "",
          }}
          validationSchema={object({
            productName: string()
              .required("You need to provide a name")
              .min(2, "Your full name needs to be at lease 2 characters")
              .max(10, "Your name can not be bigger than 10 characters"),
            price: string().required("You need to provide price"),
            sex: string().required("You need to provide sex"),
            selection: string().required("You need to provide na"),
          })}
          onSubmit={async (values, { resetForm }) => {
            dispatch(
              addProduct({
                id: small_id,
                name: values.productName,
                nation: values.selection,
                sex: values.sex,
                style: values.style,
                img: URL.createObjectURL(selectedImage),
                price: values.price,
              })
            );
            resetForm();
            setSelectedImage(null);
            setOpen(true);
          }}
        >

          {({ values, errors, isSubmitting }) => (
            <Form autoComplete="off">
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Field
                  fullWidth
                    name="productName"
                    component={TextField}
                    label="T??n n?????c hoa"
                  />
                </Grid>
                <Grid item>
                  <Field name="selection" component={Select} label="Xu???t x???">
                    {/* <MenuItem value="Ch???n xu???t x???">
                      <em>Ch???n xu???t x???</em>
                    </MenuItem> */}
                    <MenuItem value="Anh">Anh</MenuItem>
                    <MenuItem value="??? R???p">??? R???p</MenuItem>
                    <MenuItem value="M???">M???</MenuItem>
                    <MenuItem value="Ph??p">Ph??p</MenuItem>
                    <MenuItem value="??">??</MenuItem>
                  </Field>
                </Grid>
                <Grid item>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    D??nh cho
                  </FormLabel>
                  <Field name="sex" component={RadioGroup} row>
                    <FormControlLabel
                      control={<Radio />}
                      label="N???"
                      value="N???"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="Nam"
                      value="Nam"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="Trung t??nh"
                      value="Trung t??nh"
                    />
                  </Field>
                </Grid>
                <Grid item>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Phong c??ch
                    </FormLabel>

                    <Field
                      fullWidth
                      name="style"
                      type="checkbox"
                      component={CheckboxWithLabel}
                      value="Sang tr???ng, "
                      Label={{ label: "Sang tr???ng" }}
                    />
                    <Field
                      fullWidth
                      name="style"
                      type="checkbox"
                      component={CheckboxWithLabel}
                      value="Quy???n r??, "
                      Label={{ label: "Quy???n r??" }}
                    />
                    <Field
                      fullWidth
                      name="style"
                      type="checkbox"
                      value="Ng???t ng??o, "
                      component={CheckboxWithLabel}
                      Label={{ label: "Ng???t ng??o" }}
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Field
                    fullWidth
                    name="price"
                    component={TextField}
                    InputProps={{
                      inputComponent: CurrencyInput,
                    }}
                    label="Gi?? b??n"
                  />
                </Grid>
                <Grid item>
                  {selectedImage && (
                    <div>
                      <img
                        name="myimg"
                        alt="not fount"
                        width={"100px"}
                        src={URL.createObjectURL(selectedImage)}
                      />
                      <br />
                      {/* <button onClick={()=>setSelectedImage(null)}>Remove</button> */}
                    </div>
                  )}
                  <br />

                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<AddPhotoAlternateIcon />}
                    size="small"
                  >
                    Ch???n h??nh ???nh
                    <input
                      accept="image/*"
                      type="file"
                      name="img"
                      hidden
                      onChange={(event) => {
                        setSelectedImage(event.target.files[0]);
                      }}
                    />
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    type="submit"
                    fullWidth
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary"
                    // startIcon={
                    //   isSubmitting ? (
                    //     <CircularProgress size="0.9rem" />
                    //   ) : undefined
                    // }
                  >
                    {/* {isSubmitting ? "Submitting" : "Submit"} */}
                    Th??m n?????c hoa
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        {/* <FormControl variant="standard">
        <InputLabel htmlFor="formatted-text-mask-input">react-imask</InputLabel>
        <Input

          name="textmask"
          id="formatted-text-mask-input"
          inputComponent={CurrencyInput}
        />
      </FormControl> */}
      </CardContent>
    </Card>
  );
}
