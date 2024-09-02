import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { plus, minus, reset } from '../../reducers/counterSlice'

class InfoItem extends Component {
  static defaultProps = {
    title: 'Имя пользователя',
    classTitle: 'user-name',
    incrementNumber: 2,
    value: '',
  }

  static propTypes = {
    title: PropTypes.string,
    classTitle: PropTypes.string,
    incrementNumber: PropTypes.number,
    value: PropTypes.string,
    count: PropTypes.number.isRequired,
    plus: PropTypes.func.isRequired,
    minus: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }

  constructor(properties) {
    super(properties)
    this.state = {
      count: 10,
    }

    this.handleOnClick = this.handleOnClick.bind(this)

    this.itemRef = React.createRef()

    console.info('1. constructor()')
  }

  static getDerivedStateFromProps(properties, state) {
    console.info('2. getDerivedStateFromProps()')
    if (state.count === 10) {
      // if (properties.incrementNumber > 0) {
      return {
        count: properties.incrementNumber,
      }
    }
    return null
  }

  shouldComponentUpdate(nextProperties, nextState) {
    console.info('3. shouldComponentUpdate()')
    console.info(nextProperties, nextState)
    // return false
    return true
  }

  getSnapshotBeforeUpdate(previousProperties, previousState) {
    console.info('5. getSnapshotBeforeUpdate()')
    console.info(previousProperties, previousState)
    const item = this.itemRef.current
    return {
      test: '1234',
      scroll: item.offsetTop,
    }
  }

  componentDidUpdate(previousProperties, previousState, snapshot) {
    console.info('6. componentDidUpdate()')
    console.info(previousProperties, previousState, snapshot)

    if (snapshot !== null && snapshot.scroll && snapshot.scroll < 0) {
      alert('Элемент выходит за пределы страницы')
    }
  }

  timer = null
  componentDidMount() {
    this.timer = setInterval(() => {
      console.info('5. Timer')
    }, 1000)
    console.info('5. componentDidMount()')
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  incrementCount(previousState, properties) {
    return {
      count: previousState.count + properties.incrementNumber,
    }
  }

  handleOnClick() {
    // this.setState({ count: this.state.count + 1 })
    // this.setState({ count: this.state.count + 1 })
    // this.setState({ count: this.state.count + 1 })

    // this.setState((previousState, properties) => {
    //   return {
    //     count: previousState.count + properties.incrementNumber,
    //   }
    // })

    this.setState(this.incrementCount)
    this.setState(this.incrementCount)
    this.setState(this.incrementCount)
  }

  render() {
    console.info('4. render()')
    return (
      <>
        <div
          className="header"
          ref={this.itemRef}
        >
          {this.props.title}
        </div>
        <div className={'user-info ' + this.props.classTitle}>
          {this.props.value}
        </div>
        {/* Count: <b>{this.state.count}</b> &nbsp;
        <button onClick={this.handleOnClick.bind(this)}>+1</button>
        <button onClick={this.handleOnClick}>+1</button> */}
        {/* <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          +1
        </button> */}
        {/* <button onClick={() => this.forceUpdate()}>forceUpdate()</button> */}
        <h3>Число: {this.props.count}</h3>
        <button onClick={this.props.plus}>+1</button>
        <button onClick={this.props.minus}>-1</button>
        <button onClick={this.props.reset}>Reset</button>
      </>
    )
  }
}

const mapStateToProperties = (state) => ({
  count: state.counter.count,
})

const mapDispatchToProperties = {
  plus,
  minus,
  reset,
}

export default connect(mapStateToProperties, mapDispatchToProperties)(InfoItem)
