import React from 'react'
import { connect } from 'react-redux'

// can this be a dummy component instead?
export class AllProducts extends React.Component {
  render () {
    return (
      <div>
          {
            this.props.allProducts && this.props.allProducts
            .filter(product => product.inventory)
            .map(product => {
              return (
                <div key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <p>{product.name}</p>
                    <img src={product.photo} />
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                  </Link>
                </div>
              )
            })
          }
      </div>
    )
  }
}

const mapStateToProps = state => ({allProducts: state.allProducts})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
