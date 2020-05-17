import React from 'react'

import { withRouter } from 'react-router-dom'

class Home extends React.Component {
  render = () => {
    return (
      <div>
        <div>
          <img src="https://drive.google.com/uc?id=1_gZGiiB5zj35VCKBo6GFn_Gqg5RxAAO7" alt="" width="100px" height="100px"/>
        </div>
        <div>
          Abc
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
