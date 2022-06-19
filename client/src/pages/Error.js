import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../assets/not-found.svg";

function Error() {
  return (
    <Container>
      <Typography align="center">
        <Box>
          <Box sx={{ maxWidth: "md" }}>
            <Box
              component="img"
              sx={{
                height: "50%",
                width: "60%",
                maxHeight: "55%",
                maxWidth: "75%",
              }}
              alt="Image"
              src={errorImg}
            />
            <h3>Ohh! Page not found!</h3>
            <p> We can't seem to find the page you're looking for</p>

            <Link to="/">
              <Button>Back Home</Button>
            </Link>
          </Box>
        </Box>
      </Typography>
    </Container>
  );
}

export default Error;
