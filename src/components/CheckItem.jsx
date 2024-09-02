import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchIncomesExpensesById } from '../reducers/incomesExpensesSlice'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import moment from 'moment'
import { getCategoryLabel, getTypeLabel } from './constants/check'

export default function CheckItem() {
  let { itemId } = useParams()
  itemId = Number(itemId)

  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => {
    const item = state.incomesExpenses.data.find((item) => item.id === itemId)
    return {
      data: item,
      loading: state.incomesExpenses.loading,
      error: state.incomesExpenses.error,
    }
  })

  useEffect(() => {
    dispatch(fetchIncomesExpensesById(itemId))
  }, [dispatch, itemId])

  if (loading || !data) {
    return <div>Идет загрузка данных...</div>
  }

  if (error) {
    return <div>Ошибка получения данных: {error}</div>
  }

  return (
    <div>
      <Breadcrumb className="mb-5">
        <Breadcrumb.Item>
          <Link to="/">Главная</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/incomes">Все чеки</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>№ {itemId}</Breadcrumb.Item>
      </Breadcrumb>

      <h2>{data.title}</h2>
      <Table
        striped
        hover
        variant="light"
        className="mt-4"
      >
        <thead>
          <tr>
            <th>Название</th>
            <th>Значение</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>№</td>
            <td>{data.id}</td>
          </tr>
          <tr>
            <td>Сумма</td>
            <td>{data.amount} &#8381;</td>
          </tr>
          <tr>
            <td>Тип операции</td>
            <td>{getTypeLabel(data.type)}</td>
          </tr>
          <tr>
            <td>Категория</td>
            <td>{getCategoryLabel(data.category)}</td>
          </tr>
          <tr>
            <td>Дата создания</td>
            <td>{moment(data.date).format('DD.MM.YYYY')}</td>
          </tr>
          <tr>
            <td colSpan="2">
              <h5>Описание</h5>
              <p>{data.description}</p>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
