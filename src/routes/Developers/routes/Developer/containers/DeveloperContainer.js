import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty, dataToJS } from 'react-redux-firebase';
import LoadingSpinner from '../../../../../Components/LoadingSpinner';
import classes from './DeveloperContainer.scss';


// Get Developer path from firebase based on params prop (route params)
@firebaseConnect(({ params }) => ([
    `developers/${params.developername}`
]))
// Map state to props
@connect(({ firebase }, { params }) => ({
    developer: dataToJS(firebase, `developers/${params.developername}`)
}))
export default class Developer extends Component {
    static propTypes = {
        developer: PropTypes.object,
        params: PropTypes.object.isRequired
    };
    render () {
        const { developer, params } = this.props;
        if (isEmpty(developer)) {
            return (
                <div>
                    Developer not found
                </div>
            )
        }
        if (!isLoaded(developer)) {
            return <LoadingSpinner />
        }
        return (
            <div className={classes.container}>
                <h2>Developer Container</h2>
                <pre>Developer Key: {params.developername}</pre>
                <pre>{JSON.stringify(developer, null, 2)}</pre>
            </div>
        )
    }
}