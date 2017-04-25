import React from 'react'
import { connect } from 'react-redux'

// OB/DY: you could define a util `mapKeyVals` e.g. `mapKeyVals(obj, (k, v) => {})`
export const SingleOrder = props => {
  const order = props.selectedOrder
  const orderArr = Object.entries(order) // IE and Opera do not support Object.entries (see waffle for issue; delete this comment when issue is resolved);
  return (
    <div key={order.id}> {/* OB/DY: key not needed here */}
      {
        orderArr && orderArr.map(col => { // OB/DY: could use destructuring, also `orderArr` always true
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
