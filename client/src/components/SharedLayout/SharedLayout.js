import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Grid } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useAppContext } from "../../context/appContext";

function createData(number, item, qty, price) {
  return { number, item, qty, price };
}

const rows = [
  createData(1, "Apple", 5, 3),
  createData(2, "Orange", 2, 2),
  createData(3, "Grapes", 3, 1),
  createData(4, "Tomato", 2, 1.6),
  createData(5, "Mango", 1.5, 4),
];
const handleChangeToken = () => {};
const handleChangePage = () => {};
const handleChangeRowsPerPage = () => {};

export default function SharedLayout() {
  const { resetState } = useAppContext();
  const [state, setValue] = useState(0);
  const navigateTo = useNavigate();

  const goBack = (url) => {
    resetState();
    navigateTo(url);
  };
  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{ mx: "auto", my: "2%", borderRadius: 1, px: "2px" }}
      >
        <Grid item xs={12} sm={7}>
          <Button
            onClick={() => {
              goBack("/");
            }}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={6} sm={2}>
          <FormControl fullWidth>
            <InputLabel id="tokenInputLabel">Token</InputLabel>
            <Select
              labelId="tokenSelect"
              id="tokenSelect"
              value={10}
              label="Token"
              onChange={handleChangeToken}
            >
              <MenuItem value={10}>token1</MenuItem>
              <MenuItem value={20}>token2</MenuItem>
              <MenuItem value={30}>token2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns} s>
            <DatePicker
              label="Select date"
              value={state}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              border: "1px ",
              mx: "auto",
            }}
          >
            <Table>
              <TableHead
                sx={{
                  borderBottom: "2px solid grey",
                  mx: "auto",
                }}
              >
                <TableRow>
                  <TableCell>Transaction ID:</TableCell>
                  <TableCell align="right" sx={{ mx: "auto" }}>
                    Date:
                  </TableCell>
                  <TableCell align="right">From:</TableCell>
                  <TableCell align="right">To:</TableCell>
                  <TableCell align="right">Token:</TableCell>
                  <TableCell align="right">Amount:</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.number}>
                    <TableCell component="th" scope="row">
                      {row.number}
                    </TableCell>
                    <TableCell align="right">{row.item}</TableCell>
                    <TableCell align="right">{row.qty}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>

      <TablePagination
        component="div"
        count={100}
        page={0}
        onPageChange={handleChangePage}
        rowsPerPage={10}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
