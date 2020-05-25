import React from "react";
import ReactGA from "react-ga";
import PropTypes from 'prop-types'

class BaseAnalyticsComponent extends React.Component {

    static propTypes ={
        pageLabel: PropTypes.string.isRequired
    }

    state = {
        page: null,
    }

    trackClick(label) {
        if (this.props.pageLabel !== "" || label !== "") {
            ReactGA.event({
                category: this.props.pageLabel,
                action: "Click",
                label: label
            });
        }
    }

    trackClickWithValue(label,value){
        if (this.props.pageLabel !== "" || label !== "") {
            ReactGA.event({
                category: this.props.pageLabel,
                action: "Click",
                label: label + " - " + value
            });
        }
    }

};

export default BaseAnalyticsComponent;