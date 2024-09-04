import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIncomesExpenses } from '../../reducers/incomesExpensesSlice'
import {
  Container,
  Form,
  Button,
  Table,
  Spinner,
  Alert,
  Row,
  Col,
} from 'react-bootstrap'
import moment from 'moment'
import { getCategoryLabel, getTypeLabel } from '../constants/check'

export default function Statistics() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.incomesExpenses)

  useEffect(() => {
    dispatch(fetchIncomesExpenses())
  }, [dispatch])

  const filteredData = useMemo(() => {
    if (data && startDate && endDate) {
      return data.filter((item) => {
        const itemDate = moment(item.date)
        return itemDate.isBetween(startDate, endDate, null, '[]')
      })
    }
    return []
  }, [data, startDate, endDate])

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
  }

  const renderTable = () => (
    <Table
      striped
      hover
      variant="light"
      className="mt-4"
    >
      <thead>
        <tr>
          <th>Название</th>
          <th>Сумма</th>
          <th>Тип</th>
          <th>Категория</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((item) => (
          <tr key={item.id}>
            <td>
              <Row>
                <Col>{item.title}</Col>
              </Row>
            </td>
            <td>
              <Row>
                <Col>{item.amount} &#8381;</Col>
              </Row>
            </td>
            <td>
              <Row>
                <Col>{getTypeLabel(item.type)}</Col>
              </Row>
            </td>
            <td>
              <Row>
                <Col>{getCategoryLabel(item.category)}</Col>
              </Row>
            </td>
            <td>
              <Row>
                <Col>{moment(item.date).format('DD.MM.YYYY')}</Col>
              </Row>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner
          animation="border"
          role="status"
          variant="primary"
        >
          <span className="visually-hidden">Идет загрузка данных...</span>
        </Spinner>
      </div>
    )
  }

  if (error) {
    return <Alert variant="danger">Ошибка получения данных: {error}</Alert>
  }

  return (
    <Container>
      <h1>Статистика</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Дата начала</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Дата окончания</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
        >
          Применить
        </Button>
      </Form>

      {isSubmitted && filteredData.length === 0 && (
        <Alert
          variant="info"
          style={{ marginTop: '20px' }}
        >
          Нет данных за выбранный период.
        </Alert>
      )}

      {filteredData.length > 0 && renderTable()}
    </Container>
  )
}
