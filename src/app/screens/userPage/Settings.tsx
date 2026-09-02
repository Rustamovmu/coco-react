import React, { ChangeEvent, FormEvent, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import CheckIcon from "@mui/icons-material/Check";

const initialProfile = {
  memberName: "Martin Robertson",
  memberEmail: "martin@example.com",
  memberPhone: "+998 90 123 45 67",
  memberAddress: "Downtown, Tashkent",
};

export function Settings() {
  const [profile, setProfile] = useState(initialProfile);
  const [preview, setPreview] = useState<string>();
  const [saved, setSaved] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSaved(false);
    setProfile((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <Box component="form" className="coco-settings" onSubmit={handleSubmit}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" className="coco-settings__title">
        <Box>
          <Typography component="h2">Profile details</Typography>
          <Typography>Keep your contact and delivery information up to date.</Typography>
        </Box>
        {saved && <Stack direction="row" alignItems="center" className="coco-settings__saved"><CheckIcon /> Saved</Stack>}
      </Stack>

      <Stack direction="row" alignItems="center" className="coco-settings__photo">
        <Box className="coco-settings__photo-preview">
          {preview ? <Box component="img" src={preview} alt="Profile preview" /> : <span>MR</span>}
        </Box>
        <Box>
          <Typography component="h3">Profile photo</Typography>
          <Typography>JPG or PNG, up to 5 MB.</Typography>
          <Button component="label" startIcon={<PhotoCameraOutlinedIcon />}>
            Change photo
            <input type="file" accept="image/png,image/jpeg" hidden onChange={handleImage} />
          </Button>
        </Box>
      </Stack>

      <Box className="coco-settings__fields">
        <TextField label="Full name" name="memberName" value={profile.memberName} onChange={handleChange} fullWidth />
        <TextField label="Email address" name="memberEmail" type="email" value={profile.memberEmail} onChange={handleChange} fullWidth />
        <TextField label="Phone number" name="memberPhone" value={profile.memberPhone} onChange={handleChange} fullWidth />
        <TextField label="Delivery address" name="memberAddress" value={profile.memberAddress} onChange={handleChange} fullWidth />
      </Box>

      <Box className="coco-settings__preferences">
        <Typography component="h3">Communication</Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography>Collection updates</Typography>
            <Typography>Receive occasional notes about new arrivals and private edits.</Typography>
          </Box>
          <label className="coco-settings__switch">
            <input type="checkbox" defaultChecked aria-label="Receive collection updates" />
            <span />
          </label>
        </Stack>
      </Box>

      <Stack direction="row" justifyContent="flex-end" className="coco-settings__actions">
        <Button type="button" onClick={() => { setProfile(initialProfile); setSaved(false); }}>Cancel</Button>
        <Button type="submit" variant="contained">Save changes</Button>
      </Stack>
    </Box>
  );
}
