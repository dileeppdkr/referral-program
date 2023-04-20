import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReferralForm from './ReferralForm';
import axios from 'axios';
// import  React from 'react';
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));
const API_URL = "http://127.0.0.1:3001/api/v1";


// const referrals = userAuth ? axios.get(`${API_URL}/referrals?id=${userAuth.id}`) : [];
// console.log('referrals: ', referrals);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Home() {
  const [referralData, setReferralData] = useState([])
  useEffect(() => {
    const userAuth = JSON.parse(localStorage.getItem('user-data'));
    const fetchUserFererral = async () =>{
      try {
        const result = await axios.get(`${API_URL}/referrals?id=${userAuth.id}`);
        console.log('result: ', result);
        setReferralData(result.data || [])
      } catch (error) {
        return [];
      }
    }
    fetchUserFererral()
  }, [])
  return (
    <>
      <ReferralForm />
      <Div>{"Referral Emails"}</Div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="left">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {referralData.map((row, i) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i+1}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    
  );
}

