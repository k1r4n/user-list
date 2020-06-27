import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

import {faEnvelope, faMobile, faMapMarker} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const List = ({
  userList,
}) => (
  <div className={styles.userList}>
    {
      userList.map((user) => (
        <div key={user.email} className={styles.user}>
          <img src={user.picture ? user.picture.large : './media/user.png'} width={100} height={180} />
          <div className={styles.data}>
            <h3>{user.name.title} {user.name.first} {user.name.last}</h3>
            <p>
              <FontAwesomeIcon
                icon={faEnvelope}
              />&nbsp;&nbsp;
              {user.email}
            </p>
            <p>
              <FontAwesomeIcon
                icon={faMobile}
              />&nbsp;&nbsp;
              {user.email}
            </p>
            {user.location &&
              <p>
                <FontAwesomeIcon
                  icon={faMapMarker}
                />&nbsp;&nbsp;
                {user.location.city},&nbsp;{user.location.state}&nbsp;{user.location.country}
              </p>
            }
          </div>
        </div>
      ))
    }
  </div>
);

List.propTypes = {
  userList: PropTypes.array,
};

export default List;
