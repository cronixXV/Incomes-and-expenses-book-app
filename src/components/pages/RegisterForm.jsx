import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '../../reducers/authSlice'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Alert } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export default function RegisterForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error, status } = useSelector((state) => state.auth)
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(register({ email, password, name }))
  }

  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/')
    }
  }, [status, navigate])

  return (
    <Form
      onSubmit={handleSubmit}
      style={{ maxWidth: '330px' }}
    >
      <div className="text-center">
        <h1 className="h3 mb-4 fw-normal">
          {t('registerForm.registrationFormTitle')}
        </h1>
      </div>

      <Form.Group className="mb-2">
        <Form.Control
          type="text"
          size="lg"
          placeholder={t('registerForm.usernamePlaceholder')}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control
          type="email"
          size="lg"
          placeholder={t('registerForm.emailPlaceholder')}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control
          type="password"
          size="lg"
          placeholder={t('registerForm.passwordPlaceholder')}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      {status === 'failed' && error && <Alert variant="danger">{error}</Alert>}

      <Button
        variant="primary"
        size="lg"
        type="submit"
        className="w-100"
      >
        {t('registerForm.registerButton')}
      </Button>
    </Form>
  )
}
