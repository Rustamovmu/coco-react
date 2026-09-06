import { ChangeEvent, useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import { PaymentMethod } from "../../../lib/payment";

interface PaymentDetailsFormProps {
  savedMethod?: PaymentMethod | null;
  submitting?: boolean;
  submitLabel?: string;
  onSubmit: (method: PaymentMethod) => void | Promise<void>;
}

export default function PaymentDetailsForm({ savedMethod, submitting = false, submitLabel = "Save payment details", onSubmit }: PaymentDetailsFormProps) {
  const [values, setValues] = useState({ cardholderName: savedMethod?.cardholderName || "", paymentReference: "", expiryNote: savedMethod?.expiry || "", confirmationCode: "" });
  const [error, setError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const value = event.target.value;
    setError("");
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!values.cardholderName.trim()) return setError("Enter the cardholder name.");
    if (!values.paymentReference.trim()) return setError("Enter a demo payment reference.");
    if (!values.expiryNote.trim()) return setError("Enter a demo expiry value.");
    if (!values.confirmationCode.trim()) return setError("Enter a demo confirmation code.");
    await onSubmit({ cardholderName: values.cardholderName.trim(), lastFour: values.paymentReference.trim().slice(-4), expiry: values.expiryNote.trim() });
    setValues((current) => ({ ...current, paymentReference: "", confirmationCode: "" }));
  };

  return <Box className="coco-payment-form">
    {savedMethod && <Typography className="coco-payment-form__saved"><CreditCardOutlinedIcon /> Saved card ending in {savedMethod.lastFour}</Typography>}
    {error && <Alert severity="error">{error}</Alert>}
    <Box className="coco-payment-form__fields">
      <TextField required label="Account name (demo)" name="cardholderName" value={values.cardholderName} onChange={handleChange} disabled={submitting} autoComplete="off" />
      <TextField required label="Payment reference (demo)" name="paymentReference" value={values.paymentReference} onChange={handleChange} disabled={submitting} placeholder={savedMethod ? `Saved value ending in ${savedMethod.lastFour}` : "Enter any value"} autoComplete="off" />
      <TextField required label="Expiry note (demo)" name="expiryNote" value={values.expiryNote} onChange={handleChange} disabled={submitting} placeholder="Enter any value" autoComplete="off" />
      <TextField required label="Confirmation code (demo)" name="confirmationCode" type="password" value={values.confirmationCode} onChange={handleChange} disabled={submitting} placeholder="Enter any value" autoComplete="new-password" />
    </Box>
    <Typography className="coco-payment-form__note">Demo only. No payment is processed, and the entered reference and confirmation values are discarded.</Typography>
    <Button type="button" variant="contained" disabled={submitting} onClick={handleSubmit}>{submitting ? "Processing…" : submitLabel}</Button>
  </Box>;
}
