import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIncomesExpenses } from '../../reducers/incomesExpensesSlice'
import { Card, CardGroup, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { getCategoryLabel } from '../constants/check'

export default function AllChecks() {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.incomesExpenses)

  useEffect(() => {
    dispatch(fetchIncomesExpenses())
  }, [dispatch])

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
    return <div>Ошибка получения данных: {error}</div>
  }

  return (
    <div>
      <h1>Все чеки</h1>
      <CardGroup as="div">
        {data.map((item) => (
          <div
            key={item.id}
            className="p-3 col-sm-12 col-md-6 col-lg-4 col-xxl-3"
          >
            <Card>
              <Card.Body>
                <Card.Title>№ {item.id}</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>{item.title}</ListGroup.Item>
                  <ListGroup.Item>
                    Категория: {getCategoryLabel(item.category)}
                  </ListGroup.Item>
                  <ListGroup.Item>Сумма: {item.amount} &#8381;</ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Link
                      as={Link}
                      to={`/items/${item.id}`}
                    >
                      Подробнее
                    </Card.Link>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </div>
        ))}
      </CardGroup>
    </div>
  )
}
