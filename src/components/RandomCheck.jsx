import React, { useState, useEffect } from 'react'
// import axios from 'axios'

import { getRandomInt } from 'Helpers/random'
import InfoItems from './InfoItems'
import Button from './Button'
import useFetch from 'Hooks/useFetch'

const infoItems = [
  {
    title: 'Имя пользователя',
    classTitle: 'user-name',
    value: '',
  },
  {
    title: 'Сумма',
    classTitle: 'user-amount',
    value: '',
  },
  {
    title: 'E-mail',
    classTitle: 'user-email',
    value: '',
  },
]

export default function RandomCheck() {
  const [isShowCheck, setIsShowCheck] = useState(false)
  // const [appData, setAppData] = useState(infoItems)
  const [appDataUpdatedAt, setAppDataUpdatedAt] = useState(new Date())
  const { data, loading, error, getData } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${getRandomInt(1, 10)}`
  )

  useEffect(() => {
    // console.info('App:useEffect()')
    // axios
    //   .get(`https://jsonplaceholder.typicode.com/users/${getRandomInt(1, 10)}`)
    //   .then((result) => {
    //     infoItems[0].value = result.data.name
    //     // infoItems[1].value = getRandomInt(1000, 10_000) + ' &#8381;'
    //     infoItems[1].value = getRandomInt(1000, 10_000) + ' \u20BD'
    //     infoItems[2].value = result.data.email
    //     setAppData([...infoItems])
    //   })
    getData(`https://jsonplaceholder.typicode.com/users/${getRandomInt(1, 10)}`)
  }, [appDataUpdatedAt])

  if (loading || !data) {
    return <div>Загрузка...</div>
  }

  if (error) {
    console.info(error)
    return null
  }

  infoItems[0].value = data.name
  infoItems[1].value = getRandomInt(1000, 10_000) + ' \u20BD'
  infoItems[2].value = data.email

  return (
    <>
      {isShowCheck && (
        <InfoItems
          items={infoItems}
          setIsShowCheck={setIsShowCheck}
        />
      )}

      <Button
        classes={['main-btn']}
        onClickCallback={() => setIsShowCheck(!isShowCheck)}
      >
        {isShowCheck ? 'Скрыть чек' : 'Показать чек'}
      </Button>

      {isShowCheck && (
        <Button
          classes={['main-btn']}
          onClickCallback={() => setAppDataUpdatedAt(new Date())}
        >
          <b>Еще чек</b>
        </Button>
      )}
    </>
  )
}
