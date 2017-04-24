import React from 'react'
import { connect } from 'react-redux'

export const SingleOrder = props => {
  const order = props.selectedOrder
  const orderArr = Object.entries(order)
  return (
    <div key={order.id}>
      {
        orderArr && orderArr.map(col => {
          return (
            <div>
              <h3>{col[0]}</h3>
              <p>{col[1]}</p>
            </div>
          )
        })
      }
    </div>
  )
}

const mapStateToProps = state => ({selectedOrder: state.selectedOrder})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
