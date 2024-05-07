// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations'

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(20)
  }
}))

const ComingSoon = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <BoxWrapper>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant='h2' sx={{ mb: 1.5 }}>
              Cette page sera bientôt disponible
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Soyez patients !</Typography>
          </Box>
        </BoxWrapper>
        <Img height='500' alt='coming-soon-illustration' src='/images/pages/coming-soon.png' />
      </Box>
      <FooterIllustrations />
    </Box>
  )
}
ComingSoon.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ComingSoon
