import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Register from './index'
import { useAuth } from 'src/hooks/useAuth'

jest.mock('src/hooks/useAuth', () => ({
  useAuth: jest.fn()
}))

const mockToast = jest.fn()
jest.mock('react-hot-toast', () => ({
  error: mockToast
}))

describe('Register Component', () => {
  beforeEach(() => {
    useAuth.mockImplementation(() => ({
      register: jest.fn().mockImplementation((creds, callback) => {
        callback()
      })
    }))
  })

  it('renders without crashing', () => {
    render(<Register />)
    expect(screen.getByText('Créer mon compte')).toBeInTheDocument()
  })

  it('validates user inputs and shows error messages', async () => {
    render(<Register />)

    const submitButton = screen.getByText('Créer mon compte')

    userEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Le champ email est requis')).toBeInTheDocument()
    })
  })

  it('submits the form with valid data', async () => {
    const { register } = useAuth()
    render(<Register />)

    userEvent.type(screen.getByLabelText('Prénom'), 'John')
    userEvent.type(screen.getByLabelText('Nom'), 'Doe')
    userEvent.type(screen.getByLabelText('Email'), 'john.doe@example.com')
    userEvent.type(screen.getByLabelText('Téléphone'), '1234567890')
    userEvent.type(screen.getByLabelText('Société'), 'Tech Inc')
    userEvent.type(screen.getByLabelText('Mot de passe'), 'password123')

    userEvent.click(screen.getByText('Créer mon compte'))

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith(
        {
          email: 'john.doe@example.com',
          firstName: 'John',
          lastName: 'Doe',
          phone: '1234567890',
          company: 'Tech Inc',
          password: 'password123'
        },
        expect.any(Function)
      )
    })
  })
})
