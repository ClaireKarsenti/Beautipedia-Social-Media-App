import { Box, Link, Typography } from '@mui/material';

function Footer() {
  return (
    <Box width="100%" textAlign="center">
      <Typography>
        Code with ♡ by
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/claire-karsenti/"
          aria-label="My linkedin"
          underline="none"
          color="inherit"
        >
          {' '}
          Claire Karsenti
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
