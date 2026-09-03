import React, { FormEvent, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Member, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";

interface AuthenticationModalProps {
  open: boolean;
  onClose: () => void;
  onAuthenticated: (member: Member) => void;
}

const initialForm = { name: "", email: "", phone: "", password: "" };

export default function AuthenticationModal({ open, onClose, onAuthenticated }: AuthenticationModalProps) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setForm(initialForm);
      setError("");
      setSubmitting(false);
    }
  }, [open]);

  const update = (field: keyof typeof initialForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("Enter your name, email, and password to create an account.");
      return;
    }

    setSubmitting(true);
    try {
      const signupInput: MemberInput = {
        memberName: form.name.trim(),
        memberEmail: form.email.trim(),
        memberPhone: form.phone.trim() || undefined,
        memberPassword: form.password,
      };
      const member = await new MemberService().signup(signupInput);
      onAuthenticated(member);
      onClose();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "We could not create your account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={submitting ? undefined : onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ p: { xs: 3, sm: 5 } }}>
        <IconButton aria-label="Close sign-up dialog" disabled={submitting} onClick={onClose} sx={{ position: "absolute", right: 14, top: 14 }}>
          <CloseIcon />
        </IconButton>
        <Stack component="form" onSubmit={submit} spacing={2.25}>
          <Box>
            <Typography sx={{ color: "#9a744c", fontSize: 11, fontWeight: 700, letterSpacing: ".16em" }}>WELCOME TO COCO</Typography>
            <Typography component="h2" sx={{ fontFamily: "Georgia, serif", fontSize: 34, fontWeight: 400, mt: 0.75 }}>Create your account</Typography>
            <Typography sx={{ color: "#706a63", fontSize: 14, mt: 0.75 }}>Save your details and keep track of your orders.</Typography>
          </Box>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField required label="Full name" value={form.name} onChange={update("name")} autoComplete="name" autoFocus />
          <TextField required label="Email address" type="email" value={form.email} onChange={update("email")} autoComplete="email" />
          <TextField label="Phone number (optional)" type="tel" value={form.phone} onChange={update("phone")} autoComplete="tel" />
          <TextField required label="Password" type="password" value={form.password} onChange={update("password")} autoComplete="new-password" />
          <Button type="submit" variant="contained" disabled={submitting} startIcon={<PersonAddAltIcon />} sx={{ bgcolor: "#27231f", minHeight: 48, textTransform: "none", "&:hover": { bgcolor: "#151310" } }}>
            {submitting ? "Creating account…" : "Create account"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
