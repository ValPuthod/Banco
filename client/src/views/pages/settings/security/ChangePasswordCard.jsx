// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'src/utils/axios'

const defaultValues = {
  password: '',
  currentPassword: '',
  passwordConfirmation: ''
}

const schema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(6, 'Le mot de passe actuel doit contenir au moins 6 caractères')
    .required('Le champ mot de passe actuel est requis'),
  password: yup
    .string()
    .min(6, 'Le nouveau mot de passe doit contenir au moins 6 caractères')
    .required('Le champ nouveau mot de passe est requis'),
  passwordConfirmation: yup
    .string()
    .required('Le champ confirmation de mot de passe est requis')
    .oneOf([yup.ref('password')], 'Les mots de passe doivent correspondre')
})

const ChangePasswordCard = () => {
  // ** States
  const [values, setValues] = useState({
    showPassword: false,
    showCurrentPassword: false,
    showPasswordConfirmation: false
  })

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(schema) })

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleClickShowPasswordConfirmation = () => {
    setValues({ ...values, showPasswordConfirmation: !values.showPasswordConfirmation })
  }

  const onPasswordFormSubmit = data => {
    axios
      .put('/password', { ...data, new_password: data.password })
      .then(res => {
        toast.success('Password Changed Successfully!')
        reset(defaultValues)
      })
      .catch(err => {
        toast.error('Something went wrong!')
      })
  }

  return (
    <Card>
      <CardHeader title='Changer mon mot de passe' />
      <CardContent>
        <form onSubmit={handleSubmit(onPasswordFormSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='Mot de passe actuel'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    label='Mot de passe actuel'
                    placeholder='············'
                    id='input-current-password'
                    error={Boolean(errors.currentPassword)}
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    {...(errors.currentPassword && { helperText: errors.currentPassword.message })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={handleClickShowCurrentPassword}
                          >
                            <Icon
                              fontSize='1.25rem'
                              icon={values.showCurrentPassword ? 'tabler:eye' : 'tabler:eye-off'}
                            />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5} sx={{ mt: 0 }}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    label='Nouveau mot de passe'
                    id='input-new-password'
                    placeholder='············'
                    error={Boolean(errors.password)}
                    type={values.showPassword ? 'text' : 'password'}
                    {...(errors.password && { helperText: errors.password.message })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={e => e.preventDefault()}
                          >
                            <Icon fontSize='1.25rem' icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='passwordConfirmation'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    placeholder='············'
                    label='Confirmer le nouveau mot de passe'
                    id='input-confirm-new-password'
                    error={Boolean(errors.passwordConfirmation)}
                    type={values.showPasswordConfirmation ? 'text' : 'password'}
                    {...(errors.passwordConfirmation && { helperText: errors.passwordConfirmation.message })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={handleClickShowPasswordConfirmation}
                          >
                            <Icon
                              fontSize='1.25rem'
                              icon={values.showPasswordConfirmation ? 'tabler:eye' : 'tabler:eye-off'}
                            />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Condition du mot de passe :</Typography>
              <Box component='ul' sx={{ pl: 6, mb: 0, '& li': { mb: 1.5, color: 'text.secondary' } }}>
                <li>6 caractères minimum</li>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' type='submit' sx={{ mr: 4 }}>
                Sauvegarder
              </Button>
              <Button type='reset' variant='tonal' color='secondary' onClick={() => reset()}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ChangePasswordCard
