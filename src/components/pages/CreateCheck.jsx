import React, { useState, useMemo } from 'react'
import { Form as RouterForm, useActionData } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import { BiAddToQueue } from 'react-icons/bi'
import { TYPE_OPTIONS, CATEGORY_OPTIONS } from '../constants/check'
import useInput from 'Hooks/useInput'
import InputField from '../InputField'

export default function CreateCheck() {
  const title = useInput('', 'title', true)
  const amount = useInput('100', 'amount', true)
  const [type, setType] = useState(TYPE_OPTIONS[0].value)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState(CATEGORY_OPTIONS[3].value)

  const data = useActionData()

  if (data && data.isOk) {
    return <div>Чек добавлен!</div>
  }

  const amountText = useMemo(
    () => <Form.Text className="text-muted">Введите сумму в &#8381;</Form.Text>,
    []
  )

  return (
    <div>
      <h2>Создание нового чека</h2>
      <Form
        as={RouterForm}
        action="/create"
        method="post"
        onSubmit={(event) => {
          if (!confirm('Создать новый чек?')) {
            event.preventDefault()
          }
        }}
      >
        <InputField
          id="title"
          title="Название"
          onChange={title.onChange}
          value={title.value}
        />

        <InputField
          id="amount"
          title="Сумма"
          onChange={amount.onChange}
          value={amount.value}
        >
          {amountText}
        </InputField>

        <Form.Group className="mb-3">
          <Form.Label>Выберите тип записи</Form.Label>
          <div>
            <Form.Check
              inline
              name="type"
              type="radio"
              id="type-radio-1"
              {...TYPE_OPTIONS[0]}
              onChange={(event) => setType(Number(event.target.value))}
              checked={type === TYPE_OPTIONS[0].value}
            />
            <Form.Check
              inline
              name="type"
              type="radio"
              id="type-radio-2"
              {...TYPE_OPTIONS[1]}
              onChange={(event) => setType(Number(event.target.value))}
              checked={type === TYPE_OPTIONS[1].value}
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Описание</Form.Label>
          <Form.Control
            as="textarea"
            id="description"
            name="description"
            value={description}
            disabled={title.value.length === 0}
            rows={5}
            onChange={(event) => {
              setDescription(event.target.value)
            }}
          />
          {title.value.length === 0 && (
            <Form.Text className="text-muted">
              Описание станет доступно для заполнения после ввода названия
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Категория</Form.Label>
          <Form.Select
            id="category"
            name="category"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value)
            }}
          >
            {CATEGORY_OPTIONS.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <div>
          {data && data.error && <Alert variant="danger">{data.error}</Alert>}
        </div>
        <Button
          type="submit"
          variant="primary"
        >
          <BiAddToQueue
            className="me-2"
            size="16"
          />
          Создать чек
        </Button>
      </Form>
    </div>
  )
}

export const createCheckAction = async ({ request }) => {
  const data = await request.formData()

  const result = {
    title: data.get('title'),
    description: data.get('description'),
    amount: Number(data.get('amount')),
    type: Number(data.get('type')),
    category: data.get('category'),
  }

  if (result.title.length < 5) {
    return { error: 'Название должно содержать более 5 символов' }
  }

  if (result.type < 0 || result.type > 1) {
    return { error: 'Выберите тип записи' }
  }

  if (result.amount < 0) {
    return { error: 'Сумма не должна быть отрицательной' }
  }

  // Axios, fetch
  axios.post(`${process.env.REACT_APP_BASE_URL}/incomes_expenses`, {
    ...result,
    date: new Date(),
  })

  return { isOk: true }
  // return redirect('/about')
}
