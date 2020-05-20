import React from 'react'
import { withRouter } from 'react-router-dom'

import BusinessService from '../../services/BusinessService'

class Home extends React.Component {

  componentDidMount = () => {
    const id = "1"
    BusinessService.get(id, (result) => {
      console.log('homeeee: ', result)
    })
  }

  render = () => {
    return (
      <div>
        Homee!
      </div>
    )
  }
}

export default withRouter(Home)
