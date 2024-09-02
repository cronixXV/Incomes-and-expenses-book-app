import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react'
import PropTypes from 'prop-types'
import InfoItem from './InfoItem'
// import InfoItem from './learn/InfoItem'
import { getRandomInt } from 'Helpers/random'
import useForceUpdate from 'Hooks/useForceUpdate'

import { useSelector } from 'react-redux'
import { useCounterDispatch } from '../reducers/counterSlice'

function InfoItems({ items = [], setIsShowCheck }) {
  const arrayComponents = items.map((item, index) => (
    <InfoItem
      title={item.title}
      classTitle={item.classTitle}
      value={item.value}
      key={index}
    />
  ))

  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)
  const count3 = useSelector((state) => state.counter.count)
  const { plus, minus, reset } = useCounterDispatch()

  // const [state, dispatch] = useReducer(reducer, initialState)
  // const forceUpdate = useReducer((x) => x + 1, 0)[1]
  const forceUpdate = useForceUpdate()
  const itemReference = useRef(null)
  // const [array, setArray] = useState(arrayComponents)

  // function handleAddItem() {
  //   setArray([
  //     ...array,
  //     <InfoItem
  //       title="Новый элемент"
  //       classTitle="test"
  //       value=""
  //       key={array.length}
  //     />,
  //   ])
  //   console.info(array)
  // }

  function handleOnClick() {
    setCount((myCount) => myCount + 1)
    setCount((count) => count + 1)
    setCount((count) => count + 1)
  }

  let scroll = 0
  let timer = 0
  useEffect(() => {
    console.info('2. useEffect() вместо componentDidMount()')
    timer = setInterval(() => {
      console.info('Функциональный компонент. Timer')
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    console.info('2. useEffect() вместо componentDidUpdate()')
    console.info('scroll:', scroll)
  }, [count])

  useLayoutEffect(() => {
    console.info('2. useLayoutEffect() вместо getSnapshotBeforeUpdate()')
    const itemElement = itemReference.current
    scroll = itemElement.offsetTop
  }, [count])

  // Вариант 1. getDerivedStateFromProps()
  // useEffect(() => {
  //   console.info('3. useEffect() вместо getDerivedStateFromProps()')
  //   if (count === 0) {
  //     setCount(2)
  //   }
  // }, [count])

  // Вариант 2. getDerivedStateFromProps()
  useMemo(() => {
    console.info('3. useMemo() вместо getDerivedStateFromProps()')
    if (count === 0) {
      setCount(2)
    }
  }, [count])

  const number = useMemo(() => getRandomInt(10, 100), [count])

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const callbackOne = () => {
    console.info('Обычная функция')
  }

  const callbackTwo = useCallback(() => {
    console.info('Функция с оберткой useCallback()')
  }, [count])

  console.info(
    '1. Функциональный компонент. Тело функции вместо constructor() и render()'
  )

  return (
    <>
      {arrayComponents}
      <div ref={itemReference}>
        <h3>useReducer()</h3>
        <div>Count: {count3}</div>
        <button
          onClick={() => {
            plus()
          }}
        >
          Count + 1
        </button>
        <button onClick={() => minus()}>Count - 1</button>
        <button onClick={() => reset()}>Count - reset</button>
      </div>

      {/* {items.map((item, index) => (
        <InfoItem
          title={item.title}
          classTitle={item.classTitle}
          key={index}
        />
      ))} */}
      <div>Случайное число: {number}</div>
      <div>
        Count: {count} &nbsp; Count2: {count2} &nbsp;
        <button onClick={handleOnClick}>+1</button>
        <button onClick={() => setCount2(count2 + 1)}>+1</button>
      </div>
      <div>
        <button onClick={forceUpdate}>forceUpdate()</button>
      </div>

      <InfoItemsTest
        one={callbackOne}
        two={callbackTwo}
      />
      <div>
        <button onClick={() => setIsShowCheck(false)}>
          Скрыть чек (из компонента InfoItems)
        </button>
      </div>
    </>
  )
}

InfoItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      classTitle: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  setIsShowCheck: PropTypes.func.isRequired,
}

function InfoItemsTest({ one, two }) {
  useEffect(() => {
    one()
  }, [one])

  useEffect(() => {
    two()
  }, [two])
}

export default InfoItems
