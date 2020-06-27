import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component, lazy, Suspense} from 'react';

import styles from './index.module.scss';

const List = lazy(() => import('./List'));
const TopBar = lazy(() => import('./TopBar'));
const AddModal = lazy(() => import('./AddModal'));
const Pagination = lazy(() => import('./Pagination'));

import {
  updateUserList,
} from '../../../actions/fetchAction';

import users from '../../../api/users';

const LIMIT = 18;

class Home extends Component {
  static defaultProps = {
    userList: [],
  }
  state = {
    modal: false,
    activePage: 1,
    pageCount: 0,
    user: {
      gender: '',
      name: {
        title: '',
        first: '',
        last: '',
      },
      email: '',
      username: '',
      password: '',
      dob: '',
      cell: '',
    },
  };

  static propTypes = {
    history: PropTypes.object,
    userList: PropTypes.array,
    updateUserList: PropTypes.func,
  }

  ajax = {};

  componentDidMount() {
    const isAuthenticated = window.localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      if (this.ajax.users) {
        this.ajax.users.cancel();
      }
      this.ajax.users = users().then((resp) => {
        window.localStorage.setItem('userList', JSON.stringify(resp.results));
        this.setState({pageCount: parseInt(((resp.results.length + 1) / LIMIT), 10) + (((resp.results.length + 1) % LIMIT) > 0 ? 1 : 0)});
        this.props.updateUserList(resp.results.slice(0, LIMIT));
        delete this.ajax.users;
      }).catch(() => {
        delete this.ajax.users;
      });
    } else {
      window.location.href = 'http://localhost:7000/login';
    }
  }

  componentDidUpdate() {
    const isAuthenticated = window.localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      window.location.href = 'http://localhost:7000/login';
    }
  }

  handleAddUser = (event) => {
    event.preventDefault();
    const {user} = this.state;
    const userList = JSON.parse(window.localStorage.getItem('userList'));
    userList.push(user);
    window.localStorage.setItem('userList', JSON.stringify(userList));
    this.props.updateUserList(userList.slice(0, LIMIT));
    this.setState({
      modal: false,
      activePage: 1,
      pageCount: parseInt(((userList.length + 1) / LIMIT), 10) + (((userList.length + 1) % LIMIT) > 0 ? 1 : 0),
    });
  }

  toggleModal = () => {
    this.setState({modal: !this.state.modal});
  }

  handleInputChange = (data, type) => {
    this.setState({user: {
      ...this.state.user,
      [type]: data,
    }});
  }

  handlePageChange = (activePage) => {
    const users = JSON.parse(window.localStorage.getItem('userList'));
    const offset = (activePage - 1) > 0 ? (activePage - 1) * LIMIT : 0;
    this.props.updateUserList(users.slice(offset, offset + LIMIT));
    this.setState({activePage});
  }

  render() {
    const {
      userList,
    } = this.props;
    const {
      user,
      errors,
      activePage,
      pageCount,
      modal,
    } = this.state;
    return (
      <div className={styles.home}>
        <div className={styles.header}>
          <span>
            <Suspense fallback={<div>Loading...</div>}>
              <TopBar
                toggleModal={this.toggleModal}
              />
            </Suspense>
          </span>
        </div>

        <div className={styles.content}>
          <Suspense fallback={<div>Loading...</div>}>
            <List
              userList={userList}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Pagination
              activePage={activePage}
              pageCount={pageCount}
              handlePageChange={this.handlePageChange}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <AddModal
              user={user}
              errors={errors}
              activeModal={modal}
              toggleModal={this.toggleModal}
              handleAddUser={this.handleAddUser}
              handleInputChange={this.handleInputChange}
            />
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userList: state.userList,
});

const mapDispatchToProps = () => ({
  updateUserList,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
