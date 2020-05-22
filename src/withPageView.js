import React from "react";
import ReactGA from "react-ga";

const trackingId = "UA-78912543-2";

ReactGA.initialize(trackingId,{testMode: process.env.NODE_ENV === "test", debug: true });

export const withPageView = (WrappedComponent, options = {}) => {
    const trackPageView = page => {
        ReactGA.set({
            page,
        });
        ReactGA.pageview(page);
    };

    return class extends React.Component {
        state = {
            page: null,
        }

        static getDerivedStateFromProps(props, state) {
            const page = props.location.pathname + props.location.search;
            if (page !== state.page) {
                return {
                    page,
                };
            }
            return null;
        }

        componentDidMount() {
            const page = this.props.location.pathname + this.props.location.search;
            trackPageView(page);
        }

        componentDidUpdate(prevProps) {
            const currentPage =
                prevProps.location.pathname + prevProps.location.search;
            const nextPage = this.state.page;

            if (currentPage !== nextPage) {
                trackPageView(nextPage);
            }
        }

        render() {
            return <WrappedComponent {
                ...this.props
            }
            />;
        }
    };
};