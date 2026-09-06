import React, { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Container, Stack, Typography } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Link } from "react-router-dom";
import { Settings } from "./Settings";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";
import "../../../css/userPage.css";

const accountLinks = [
  { label: "Profile details", icon: <PersonOutlineIcon />, active: true },
  { label: "My orders", icon: <Inventory2OutlinedIcon />, to: "/orders" },
  { label: "Saved pieces", icon: <FavoriteBorderIcon /> },
  { label: "Customer care", icon: <HelpOutlineIcon />, to: "/help" },
];

interface UserPageProps {
  authMemberId: string | null;
  onMemberUpdated: (member: Member) => void;
}

const memberImageUrl = (member?: Member | null): string | undefined => {
  if (!member?.memberImage) return undefined;
  return member.memberImage.startsWith("http")
    ? member.memberImage
    : `${serverApi}/${member.memberImage.replace(/^\//, "")}`;
};

export function UserPage({ authMemberId, onMemberUpdated }: UserPageProps) {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(Boolean(authMemberId));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authMemberId) {
      setMember(null);
      setLoading(false);
      return;
    }

    let active = true;
    new MemberService().getMemberDetail()
      .then((result) => {
        if (!active) return;
        setMember(result);
        onMemberUpdated(result);
      })
      .catch(() => {
        if (active) setError("We could not load your latest profile details.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [authMemberId, onMemberUpdated]);

  const handleUpdated = (updatedMember: Member) => {
    setMember(updatedMember);
    onMemberUpdated(updatedMember);
  };

  const points = member?.memberPoints ?? 0;
  const rewardTarget = Math.ceil((points + 1) / 200) * 200;
  const image = memberImageUrl(member);
  const initials = member?.memberNick?.slice(0, 2).toUpperCase() || "CO";

  return (
    <Box className="coco-account">
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" className="coco-account__heading">
          <Box><Typography className="coco-account__eyebrow">YOUR COCO</Typography><Typography component="h1">My account</Typography></Box>
          <Typography>Manage your details and keep your COCO experience personal.</Typography>
        </Stack>

        {!authMemberId && <Alert severity="info">Please sign in to view and update your profile.</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {loading && <Stack alignItems="center" sx={{ py: 8 }}><CircularProgress size={30} /></Stack>}

        {!loading && member && <Box className="coco-account__layout">
          <Box component="aside" className="coco-account__sidebar">
            <Box className="coco-account__profile">
              <Box className="coco-account__avatar">{image ? <Box component="img" src={image} alt={member.memberNick} /> : initials}</Box>
              <Box><Typography component="h2">{member.memberNick}</Typography><Typography>{member.memberPhone || "COCO member"}</Typography></Box>
            </Box>
            <Box component="nav" className="coco-account__nav" aria-label="Account navigation">
              {accountLinks.map((item) => {
                const content = <>{item.icon}<span>{item.label}</span></>;
                return item.to
                  ? <Link to={item.to} className="coco-account__nav-item" key={item.label}>{content}</Link>
                  : <button type="button" className={`coco-account__nav-item${item.active ? " coco-account__nav-item--active" : ""}`} key={item.label}>{content}</button>;
              })}
            </Box>
            <Box className="coco-account__membership">
              <Typography>COCO MEMBER</Typography><Typography component="strong">{points} points</Typography>
              <Box><span style={{ width: `${Math.min(100, (points / rewardTarget) * 100)}%` }} /></Box>
              <Typography>{rewardTarget - points} points until your next reward</Typography>
            </Box>
          </Box>
          <Settings member={member} memberImageUrl={image} onMemberUpdated={handleUpdated} />
        </Box>}
      </Container>
    </Box>
  );
}

export default UserPage;
