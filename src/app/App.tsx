import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
// @ts-ignore: Allow side-effect CSS import without type declarations
import "../css/app.css";

function App() {
 return ( 
    <Container maxWidth="sm" >
      <Stack direction="column">
        <Box sx={{my: 4}}>
          <Typography variant="h4" component={"h4"}>
            Create React App on TypeScript with REDUX
          </Typography>
        </Box>
        <Button variant="contained">Contained</Button>
      </Stack>
    </Container>
  );
}

export default App;
