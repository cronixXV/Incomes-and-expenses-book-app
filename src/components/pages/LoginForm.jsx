import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import bcrypt from 'bcryptjs'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import logo from '../../img/note.svg'

export default function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/users?email=${email}`)
      .then((result) => {
        const users = result.data
        if (users.length === 0) {
          setError('Неверный e-mail и/или пароль')
          setPassword('')
          return
        }

        if (
          users.length > 0 &&
          bcrypt.compareSync(password, users[0].password)
        ) {
          localStorage.setItem('isAuthenticated', true)
          localStorage.setItem('token', users[0].token)
          return navigate('/')
        } else {
          setError('Неверный e-mail и/или пароль')
          setPassword('')
        }
      })
  }

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (isAuthenticated) {
      return navigate('/')
    }
  }, [])

  return (
    <Form
      onSubmit={handleSubmit}
      style={{ maxWidth: '330px' }}
    >
      <div className="text-center">
        <img
          src={logo}
          alt="Логотип"
          width="64"
          height="64"
          className="mb-4"
        />
        <h1 className="h3 mb-4 fw-normal">Форма авторизации</h1>
      </div>

      <Form.Group className="mb-2">
        <Form.Control
          type="email"
          size="lg"
          placeholder="Email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control
          type="password"
          size="lg"
          placeholder="Пароль"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button
        variant="primary"
        size="lg"
        type="submit"
        className="w-100"
      >
        Войти
      </Button>
    </Form>
  )
}
