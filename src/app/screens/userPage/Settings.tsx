import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import CheckIcon from "@mui/icons-material/Check";
import MemberService from "../../services/MemberService";
import { Member, MemberUpdateInput } from "../../../lib/types/member";

interface SettingsProps {
  member: Member;
  memberImageUrl?: string;
  onMemberUpdated: (member: Member) => void;
}

const fieldsFromMember = (member: Member) => ({
  memberNick: member.memberNick || "",
  memberPhone: member.memberPhone || "",
  memberAddress: member.memberAddress || "",
  memberPassword: "",
});

export function Settings({ member, memberImageUrl, onMemberUpdated }: SettingsProps) {
  const [profile, setProfile] = useState(() => fieldsFromMember(member));
  const [imageFile, setImageFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => setProfile(fieldsFromMember(member)), [member]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSaved(false);
    setError("");
    setProfile((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setError("Choose a JPG, PNG, or WebP image up to 5 MB.");
      event.target.value = "";
      return;
    }
    setError("");
    setSaved(false);
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setProfile(fieldsFromMember(member));
    setImageFile(undefined);
    setPreview(undefined);
    setSaved(false);
    setError("");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!profile.memberNick.trim() || !profile.memberPhone.trim()) {
      setError("Nickname and phone number are required.");
      return;
    }

    const input: MemberUpdateInput = {
      memberNick: profile.memberNick.trim(),
      memberPhone: profile.memberPhone.trim(),
      memberAddress: profile.memberAddress.trim(),
      memberImage: imageFile,
    };
    if (profile.memberPassword) input.memberPassword = profile.memberPassword;

    setSubmitting(true);
    setError("");
    try {
      const updatedMember = await new MemberService().updateMember(input);
      onMemberUpdated(updatedMember);
      setProfile(fieldsFromMember(updatedMember));
      setImageFile(undefined);
      setPreview(undefined);
      setSaved(true);
    } catch (requestError: any) {
      setError(requestError.response?.data?.message || "We could not save your profile changes.");
    } finally {
      setSubmitting(false);
    }
  };

  const shownImage = preview || memberImageUrl;
  const initials = profile.memberNick.slice(0, 2).toUpperCase() || "CO";

  return (
    <Box component="form" className="coco-settings" onSubmit={handleSubmit}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" className="coco-settings__title">
        <Box><Typography component="h2">Profile details</Typography><Typography>Keep your contact and delivery information up to date.</Typography></Box>
        {saved && <Stack direction="row" alignItems="center" className="coco-settings__saved"><CheckIcon /> Saved</Stack>}
      </Stack>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <Stack direction="row" alignItems="center" className="coco-settings__photo">
        <Box className="coco-settings__photo-preview">{shownImage ? <Box component="img" src={shownImage} alt="Profile preview" /> : <span>{initials}</span>}</Box>
        <Box>
          <Typography component="h3">Profile photo</Typography><Typography>JPG, PNG, or WebP, up to 5 MB.</Typography>
          <Button component="label" disabled={submitting} startIcon={<PhotoCameraOutlinedIcon />}>Change photo<input type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={handleImage} /></Button>
        </Box>
      </Stack>
      <Box className="coco-settings__fields">
        <TextField required label="Nickname" name="memberNick" value={profile.memberNick} onChange={handleChange} disabled={submitting} fullWidth />
        <TextField required label="Phone number" name="memberPhone" value={profile.memberPhone} onChange={handleChange} disabled={submitting} fullWidth />
        <TextField label="Delivery address" name="memberAddress" value={profile.memberAddress} onChange={handleChange} disabled={submitting} fullWidth />
        <TextField label="New password" name="memberPassword" type="password" value={profile.memberPassword} onChange={handleChange} disabled={submitting} autoComplete="new-password" helperText="Leave blank to keep your current password" fullWidth />
      </Box>
      <Box className="coco-settings__preferences">
        <Typography component="h3">Communication</Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center"><Box><Typography>Collection updates</Typography><Typography>Receive occasional notes about new arrivals and private edits.</Typography></Box><label className="coco-settings__switch"><input type="checkbox" defaultChecked aria-label="Receive collection updates" /><span /></label></Stack>
      </Box>
      <Stack direction="row" justifyContent="flex-end" className="coco-settings__actions"><Button type="button" disabled={submitting} onClick={resetForm}>Cancel</Button><Button type="submit" variant="contained" disabled={submitting}>{submitting ? "Saving…" : "Save changes"}</Button></Stack>
    </Box>
  );
}
