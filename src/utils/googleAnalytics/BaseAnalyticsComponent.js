import React from "react";
import ReactGA from "react-ga";

class BaseAnalyticsComponent extends React.Component {

    state = {
        page: null,
    }

    trackClick(page, label) {
        if (page !== "" || label !== "") {
            ReactGA.event({
                category: page,
                action: "Click",
                label: label
            });
        }
    }

    trackClickWithValue(page,label,value){
        if (page !== "" || label !== "") {
            ReactGA.event({
                category: page,
                action: "Click",
                label: label,
                value: value
            });
        }
    }

};

export default BaseAnalyticsComponent;