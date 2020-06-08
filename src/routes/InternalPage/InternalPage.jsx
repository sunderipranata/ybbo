import React, { Fragment } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie'
import PageLabel from "../../utils/googleAnalytics/PageLabel"
// import Cookies from 'universal-cookie';

class InternalPage extends React.Component{

    componentDidMount(){
        new Cookies().set("internalTraffic",true, {maxAge:99999,path:'/'})
    }

    render = () => {
        return (
            <Fragment>
                 <article>
                    <Header pageLabel={PageLabel.HEADER}/>
                        <main className="container container__about clearfix">
                            <img src="https://pbs.twimg.com/media/DyHnlEtVYAE_3vx.jpg" alt="pepe-cookie" style={{width:"300px",height:"300px"}}/>
                        </main>
                    <Footer pageLabel={PageLabel.FOOTER} />
                 </article>
            </Fragment>
        )
    }
}

export default withRouter(InternalPage)
