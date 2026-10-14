import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { serverApi } from "../../../lib/config";
import { TopMember } from "../../../lib/types/member";
import { MEDIA } from "../../../lib/media";

interface ActiveUsersProps {
  members: TopMember[];
  loading: boolean;
  error: string;
}

const moneyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const imageUrl = (path?: string) => path
  ? (/^https?:\/\//i.test(path) ? path : `${serverApi}/${path.replace(/^\//, "")}`)
  : MEDIA.icons.defaultUser;
const purchaseLabel = (count: number) => `${count} purchase${count === 1 ? "" : "s"}`;

export default function ActiveUsers({ members, loading, error }: ActiveUsersProps) {
  const featured = members[0];

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
            Ranked by qualifying purchases, then net spend. Refunds reduce spend; cancelled and fully refunded orders do not count.
          </Typography>
        </Stack>

        {loading || error || !featured ? (
          <Box className="coco-community__status" role="status">
            {loading ? "Calculating member rankings…" : error || "No active members yet."}
          </Box>
        ) : <Box className="coco-community__panel">
          <Box component="article" className="coco-community__featured">
            <Box component="img" src={imageUrl(featured.memberImage)} alt={`${featured.memberNick}, highest-ranked COCO member`} />
            <Box className="coco-community__featured-shade" />
            <Typography className="coco-community__featured-label">MEMBER RANK · {String(featured.rank).padStart(2, "0")}</Typography>
            <Box className="coco-community__featured-copy">
              <Stack direction="row" alignItems="center" className="coco-community__online"><span /> Top customer</Stack>
              <Typography component="h3">{featured.memberNick}</Typography>
              <Typography>{purchaseLabel(featured.purchaseCount)} · {moneyFormatter.format(featured.totalSpent)} spent</Typography>
            </Box>
          </Box>

          <Box className="coco-community__roster">
            <Typography className="coco-community__roster-label">NOW IN THE CIRCLE</Typography>
            <Typography component="h3" className="coco-community__roster-title">Active members</Typography>
            <Box className="coco-community__members">
              {members.slice(1).map((member) => (
                <Stack component="article" direction="row" alignItems="center" className="coco-member-row" key={member._id}>
                  <Box className="coco-member-row__image">
                    <Box component="img" src={imageUrl(member.memberImage)} alt={`${member.memberNick}, ranked COCO member`} loading="lazy" />
                    <span />
                  </Box>
                  <Box className="coco-member-row__details">
                    <Typography component="h4">{member.memberNick}</Typography>
                    <Typography>{purchaseLabel(member.purchaseCount)}</Typography>
                  </Box>
                  <Box className="coco-member-row__meta">
                    <Typography>{String(member.rank).padStart(2, "0")}</Typography>
                    <Typography>{moneyFormatter.format(member.totalSpent)}</Typography>
                  </Box>
                </Stack>
              ))}
            </Box>
            <Stack direction="row" alignItems="center" className="coco-community__live-note">
              <Box className="coco-community__avatars">
                {members.slice(0, 3).map((member) => (
                  <Box component="img" src={imageUrl(member.memberImage)} alt="" key={member._id} />
                ))}
              </Box>
              <Typography>{members.length} active member{members.length === 1 ? "" : "s"} ranked</Typography>
            </Stack>
          </Box>
        </Box>}
      </Container>
    </Box>
  );
}
