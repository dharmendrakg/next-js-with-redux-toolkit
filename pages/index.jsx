import React, {useEffect} from 'react';
import {Button, Box, Typography, Container} from '@mui/material'
import Link from '../utils/Link';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, checkUserLoggedIn, logoutUser } from '../features/user/userSlice';

export default function Index() {
  const dispatch = useDispatch();
  const { isFetching, isError, isSuccess } = useSelector(userSelector);
  const { username, email } = useSelector(userSelector);

  useEffect(() => {
    if(!isSuccess){
      dispatch(checkUserLoggedIn());
    }
  }, [dispatch, isSuccess]);


  useEffect(() => {
    if (isError) {
      dispatch(logoutUser());
    }
  }, [dispatch, isError]);
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js v5 example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
      </Box>
      {isSuccess && <Button variant="contained" color="error" onClick={()=>dispatch(logoutUser())}>Logout</Button>}
    </Container>
  );
}