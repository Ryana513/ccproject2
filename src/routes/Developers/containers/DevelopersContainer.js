import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { firebaseConnect, populatedDataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { LIST_PATH } from '../../../constants';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import classes from './DevelopersContainer.scss';


const populates = [
    { child: 'createdBy', root: 'users' }
];

@firebaseConnect(({ params, auth }) => ([
    {
        path: 'developers',
        populates
    }
]))
@connect(({ firebase }, { params }) => ({
    projects: populatedDataToJS(firebase, 'developers', populates),
    auth: pathToJS(firebase, 'auth')
}))
export default class Developers extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    static propTypes = {
        children: PropTypes.object,
        developers: PropTypes.object,
        firebase: PropTypes.object
    };
    state = {
        newDeveloperModal: false
    };
    newSubmit = (newDeveloper) => {
        const { firebase: { pushWithMeta } } = this.props;
        // push new developer with createdBy and createdAt
        return pushWithMeta('developers', newDeveloper)
            .then(() => this.setState({ newDeveloperModal: false }))
            .catch(err => {
                // TODO: Show Snackbar
                console.error('error creating new developer', err) // eslint-disable-line
            })
    };
    deleteDeveloper = ({ name }) =>
        this.props.firebase.remove(`developers/${name}`);
    toggleModal = (name, developer) => {
        let newState = {};
        newState[`${name}Modal`] = !this.state[`${name}Modal`];
        this.setState(newState)
    };
    render () {
        // Developer Route is being loaded
        if (this.props.children) return this.props.children;
        const { developers } = this.props;
        const { newDeveloperModal } = this.state;
        if (!isLoaded(developers)) {
            return <LoadingSpinner />
        }
        return (
            <div className={classes.container}>
                {
                    newDeveloperModal &&
                    <NewDeveloperDialog
                        open={newDeveloperModal}
                        onSubmit={this.newSubmit}
                        onRequestClose={() => this.toggleModal('newDeveloper')}
                    />
                }
                <div className={classes.tiles}>
                    <NewDeveloperTile
                        onClick={() => this.toggleModal('newDeveloper')}
                    />
                    {
                        !isEmpty(developers) &&
                        map(developers, (developer, key) => (
                            <DeveloperTile
                                key={`${developer.name}-Collab-${key}`}
                                developer={developer}
                                onCollabClick={this.collabClick}
                                onSelect={() => this.context.router.push(`${LIST_PATH}/${key}`)}
                                onDelete={this.deleteDeveloper}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}