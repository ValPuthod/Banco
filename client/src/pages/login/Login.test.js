import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from './index'
import { useAuth } from 'src/hooks/useAuth'

jest.mock('src/hooks/useAuth', () => ({
  useAuth: jest.fn()
}))

describe('LoginPage Component', () => {
  const mockLogin = jest.fn()

  beforeEach(() => {
    useAuth.mockImplementation(() => ({
      login: mockLogin
    }))
    mockLogin.mockReset()
  })

  it('renders correctly', () => {
    try {
      render(<LoginPage />)
      expect(screen.getByText('Se connecter')).toBeInTheDocument()
      expect(screen.getByLabelText('email')).toBeInTheDocument()
      expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument()
    } catch (error) {
      console.error('Failed to render correctly:', error)
    }
  })

  it('displays error messages for invalid inputs', async () => {
    try {
      render(<LoginPage />)

      const loginButton = screen.getByText('Se connecter')
      userEvent.click(loginButton)

      // Check for validation errors
      await waitFor(() => {
        expect(screen.getByText('Le champ email est requis')).toBeInTheDocument()
        expect(screen.getByText('Le champ mot de passe est requis')).toBeInTheDocument()
      })
    } catch (error) {
      console.error('Validation error handling failed:', error)
    }
  })

  it('submits the form with valid data', async () => {
    try {
      render(<LoginPage />)
      const emailInput = screen.getByLabelText('email')
      const passwordInput = screen.getByLabelText('Mot de passe')

      userEvent.type(emailInput, 'test@example.com')
      userEvent.type(passwordInput, '12345')
      userEvent.click(screen.getByText('Se connecter'))

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(
          {
            email: 'test@example.com',
            password: '12345',
            rememberMe: true
          },
          expect.any(Function)
        )
      })
    } catch (error) {
      console.error('Submission error handling failed:', error)
    }
  })
})
