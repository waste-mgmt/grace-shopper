import React from 'react'
import { connect } from 'react-redux'


// should we make this a dummy component instead of a container?
export class AllOrders extends React.Component {
  render () {
    return (
      <div>
          {
            this.props.allOrders && this.props.allOrders.map(order => {
              return (
                <div key={order.id}>
                  <Link to={`/orders/${order.id}`}>
                    <p>{order.firstName + ` ` + order.lastName}</p>
                    <p>{order.status}</p>
                    <p>{order.subtotal + order.tax + order.shippingPrice}</p>
                    {order.sendDate && <p>{order.sendDate}</p>}
                  </Link>
                </div>
              )
            })
          }
      </div>
    )
  }
}

const mapStateToProps = state => ({allOrders: state.allOrders})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
