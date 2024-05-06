// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from 'src/hooks/useAuth'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'src/utils/axios'
import { LoadingButton } from '@mui/lab'

const schema = yup.object().shape({
  firstName: yup.string().required('Le champ prénom est requis'),
  lastName: yup.string().required('Le champ nom est requis'),
  phone: yup.string().required('Le champ téléphone est requis'),
  company: yup.string().required('Le champ entreprise est requis')
})

const TabProfile = () => {
  const { user, setUser } = useAuth()
  const [loading, setLoading] = useState(false)

  const defaultValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    phone: user?.phone,
    company: user?.company
  }

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(schema) })

  const onFormSubmit = data => {
    setLoading(true)
    axios
      .put('/profile', data)
      .then(res => {
        setUser(res?.data)
        toast.success('Account details updated!')
        setLoading(false)
      })
      .catch(err => {
        toast.error(err?.data?.detail)
        setLoading(false)
      })
  }

  return (
    <Grid container spacing={6}>
      {/* Account Details Card */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Profile Details' />
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='firstName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        label='First Name'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder='First Name'
                        error={Boolean(errors.firstName)}
                        {...(errors.firstName && { helperText: errors.firstName.message })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='lastName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        label='Last Name'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder='Last Name'
                        error={Boolean(errors.lastName)}
                        {...(errors.lastName && { helperText: errors.lastName.message })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='phone'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        label='Phone'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder='Phone'
                        error={Boolean(errors.phone)}
                        {...(errors.phone && { helperText: errors.phone.message })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='company'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        label='Company'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder='Company'
                        error={Boolean(errors.company)}
                        {...(errors.company && { helperText: errors.company.message })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(6.5)} !important` }}>
                  <LoadingButton loading={loading} variant='contained' type='submit' sx={{ mr: 4 }}>
                    Save Changes
                  </LoadingButton>
                  <Button type='reset' variant='tonal' color='secondary' onClick={() => reset()}>
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TabProfile
