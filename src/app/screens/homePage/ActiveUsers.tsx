import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";

const activeUsers = [
  {
    memberNick: "Amira",
    memberImage: "https://images.squarespace-cdn.com/content/v1/52879375e4b0ef08075688c3/1635868778268-PNP9QFTA4SC8TFJ2LKNV/2020.03.06_HELM-PORTRAITS_MELANIE.ELTURK%2B_1019%2B1.JPG",
    style: "Minimal layers",
    location: "Tashkent",
  },
  {
    memberNick: "Layla",
    memberImage: "https://voilechic.com/cdn/shop/files/IMG_1945.jpg?v=1764894009&width=1200",
    style: "Soft tailoring",
    location: "Dubai",
  },
  {
    memberNick: "Nora",
    memberImage: "https://i.pinimg.com/originals/30/94/df/3094df2e7368707476ef4ad58765da83.jpg",
    style: "Neutral stories",
    location: "London",
  },
  {
    memberNick: "Maya",
    memberImage: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1000",
    style: "Everyday elegance",
    location: "Istanbul",
  },
];

export default function ActiveUsers() {
  return (
    <Box component="section" className="coco-community" aria-labelledby="community-title">
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="flex-end" justifyContent="space-between" className="coco-community__header">
          <Box>
            <Typography className="coco-community__eyebrow">WORN BY YOU</Typography>
            <Typography component="h2" id="community-title" className="coco-community__title">
              People of COCO.
            </Typography>
          </Box>
          <Typography className="coco-community__intro">
            Meet the women shaping our community through considered style and quiet individuality.
          </Typography>
        </Stack>

        <Box className="coco-community__panel">
          <Box component="article" className="coco-community__featured">
            <Box component="img" src={activeUsers[0].memberImage} alt={`${activeUsers[0].memberNick}, featured COCO community member`} />
            <Box className="coco-community__featured-shade" />
            <Typography className="coco-community__featured-label">COMMUNITY PORTRAIT · 01</Typography>
            <Box className="coco-community__featured-copy">
              <Stack direction="row" alignItems="center" className="coco-community__online"><span /> Active now</Stack>
              <Typography component="h3">{activeUsers[0].memberNick}</Typography>
              <Typography>{activeUsers[0].style} · {activeUsers[0].location}</Typography>
            </Box>
          </Box>

          <Box className="coco-community__roster">
            <Typography className="coco-community__roster-label">NOW IN THE CIRCLE</Typography>
            <Typography component="h3" className="coco-community__roster-title">Active members</Typography>
            <Box className="coco-community__members">
              {activeUsers.slice(1).map((member, index) => (
                <Stack component="article" direction="row" alignItems="center" className="coco-member-row" key={member.memberNick}>
                  <Box className="coco-member-row__image">
                    <Box component="img" src={member.memberImage} alt={`${member.memberNick}, COCO community member`} loading="lazy" />
                    <span />
                  </Box>
                  <Box className="coco-member-row__details">
                    <Typography component="h4">{member.memberNick}</Typography>
                    <Typography>{member.style}</Typography>
                  </Box>
                  <Box className="coco-member-row__meta">
                    <Typography>0{index + 2}</Typography>
                    <Typography>{member.location}</Typography>
                  </Box>
                </Stack>
              ))}
            </Box>
            <Stack direction="row" alignItems="center" className="coco-community__live-note">
              <Box className="coco-community__avatars">
                {activeUsers.slice(0, 3).map((member) => (
                  <Box component="img" src={member.memberImage} alt="" key={member.memberNick} />
                ))}
              </Box>
              <Typography>4 members styling now</Typography>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
