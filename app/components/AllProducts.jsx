import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
// can this be a dummy component instead?
export class AllProducts extends React.Component {
  render () {
    return (
      <div className="container">
         <div className="row">
          {
            this.props.allProducts && this.props.allProducts.map(product => ( 
              <div key={product.id} className="col-md-4">
                <Link to={`/products/${product.id}`}>
                  <p>{product.name}</p>
                  <img src={product.photo} style={{cursor: "pointer"}} />
                  <p>{product.description}</p>
                  <p>{product.price}</p>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({allProducts: state.allProducts})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
