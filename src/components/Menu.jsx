import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Ul = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-around;
  font-size: 28px;
`

const A = styled(Link)`
  color: brown;

  &:hover {
    color: red;
    text-decoration: none;
  }
`

export default function Menu() {
  return (
    <Ul>
      <li>
        <A to="/">Главная</A>
      </li>
      <li>
        <A to="/items/1">№1</A>
      </li>
      <li>
        <A to="/items/2">№2</A>
      </li>
      <li>
        <A to="/about">О нас</A>
      </li>
      <li>
        <A to="/create">Новый чек</A>
      </li>
    </Ul>
  )
}
