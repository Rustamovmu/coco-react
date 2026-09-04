import React, { FormEvent, useEffect, useState } from "react";
import { Alert, Box, Button, Dialog, DialogContent, IconButton, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { LoginInput, Member, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";

export type AuthenticationMode = "signup" | "login";

interface AuthenticationModalProps {
  open: boolean;
  mode: AuthenticationMode;
  onClose: () => void;
  onRequestSignup: () => void;
  onRequestLogin: () => void;
  onAuthenticated: (member: Member) => void;
}

const initialForm = { name: "", email: "", nickname: "", phone: "", password: "" };

export default function AuthenticationModal({ open, mode, onClose, onRequestSignup, onRequestLogin, onAuthenticated }: AuthenticationModalProps) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isSignup = mode === "signup";

  useEffect(() => {
    setForm(initialForm);
    setError("");
    setSubmitting(false);
  }, [mode, open]);

  const update = (field: keyof typeof initialForm) => (event: React.ChangeEvent<HTMLInputElement>) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!form.password || (isSignup && (!form.name.trim() || !form.phone.trim())) || (!isSignup && !form.nickname.trim())) {
      setError(isSignup ? "Enter your name, phone number, and password to create an account." : "Enter your nickname and password to sign in.");
      return;
    }

    setSubmitting(true);
    try {
      const service = new MemberService();
      let member: Member;

      if (isSignup) {
        const signupInput: MemberInput = {
          memberName: form.name.trim(),
          memberEmail: form.email.trim() || undefined,
          memberPhone: form.phone.trim(),
          memberPassword: form.password,
        };
        member = await service.signup(signupInput);
      } else {
        const loginInput: LoginInput = { memberNick: form.nickname.trim(), memberPassword: form.password };
        member = await service.login(loginInput);
      }

      onAuthenticated(member);
      onClose();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : isSignup ? "We could not create your account. Please try again." : "We could not sign you in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return <Dialog open={open} onClose={submitting ? undefined : onClose} maxWidth="sm" fullWidth>
    <DialogContent sx={{ p: { xs: 3, sm: 5 } }}>
      <IconButton aria-label="Close authentication dialog" disabled={submitting} onClick={onClose} sx={{ position: "absolute", right: 14, top: 14 }}><CloseIcon /></IconButton>
      <Stack component="form" onSubmit={submit} spacing={2.25}>
        <Box>
          <Typography sx={{ color: "#9a744c", fontSize: 11, fontWeight: 700, letterSpacing: ".16em" }}>WELCOME TO COCO</Typography>
          <Typography component="h2" sx={{ fontFamily: "Georgia, serif", fontSize: 34, fontWeight: 400, mt: 0.75 }}>{isSignup ? "Create your account" : "Welcome back"}</Typography>
          <Typography sx={{ color: "#706a63", fontSize: 14, mt: 0.75 }}>{isSignup ? "Save your details and keep track of your orders." : "Sign in to view your account and orders."}</Typography>
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        {isSignup && <TextField required label="Full name" value={form.name} onChange={update("name")} autoComplete="name" autoFocus />}
        {isSignup ? <TextField label="Email address (optional)" type="email" value={form.email} onChange={update("email")} autoComplete="email" /> : <TextField required label="Nickname" value={form.nickname} onChange={update("nickname")} autoComplete="username" autoFocus />}
        {isSignup && <TextField required label="Phone number" type="tel" value={form.phone} onChange={update("phone")} autoComplete="tel" />}
        <TextField required label="Password" type="password" value={form.password} onChange={update("password")} autoComplete={isSignup ? "new-password" : "current-password"} />
        <Button type="submit" variant="contained" disabled={submitting} startIcon={isSignup ? <PersonAddAltIcon /> : <LoginIcon />} sx={{ bgcolor: "#27231f", minHeight: 48, textTransform: "none", "&:hover": { bgcolor: "#151310" } }}>{submitting ? "Please wait…" : isSignup ? "Create account" : "Sign in"}</Button>
        <Typography align="center" sx={{ color: "#706a63", fontSize: 13 }}>{isSignup ? "Already have an account?" : "New to Coco?"}{" "}<Button onClick={isSignup ? onRequestLogin : onRequestSignup} sx={{ color: "#6f4e2d", fontSize: 13, minWidth: 0, p: 0, textTransform: "none", textDecoration: "underline" }}>{isSignup ? "Sign in" : "Create an account"}</Button></Typography>
      </Stack>
    </DialogContent>
  </Dialog>;
}
