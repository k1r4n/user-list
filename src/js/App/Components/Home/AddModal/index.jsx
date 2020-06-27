import React from 'react';
import PropTypes from 'prop-types';
// import Creatable from 'react-select/creatable';
import {
  Col,
  Form,
  Label,
  // Alert,
  Modal,
  Input,
  Button,
  ModalBody,
  FormGroup,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';

const AddModal = ({
  user,
  // errors,
  activeModal,
  toggleModal,
  handleAddUser,
  handleInputChange,
}) => (
  <Modal isOpen={activeModal} toggle={() => toggleModal()}>
    <ModalHeader toggle={() => toggleModal('')}>Add User</ModalHeader>

    <Form onSubmit={handleAddUser}>
      <ModalBody>
        {/* {
          errors.length !== 0 &&
          <Alert color="danger">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </Alert>
        } */}
        <FormGroup row>
          <Label for="gender" sm={2}>Gender</Label>
          <Col sm={10}>
            <Input
              required
              type="text"
              name="gender"
              id="gender"
              onChange={(event) => handleInputChange(event.target.value, 'gender')}
              value={user.gender}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="name" sm={2}>Name</Label>
          <Col sm={2}>
            <Input
              required
              type="text"
              name="title"
              id="title"
              onChange={(event) => handleInputChange({...user.name, title: event.target.value}, 'name')}
              value={user.name.title}
            />
          </Col>
          <Col sm={4}>
            <Input
              required
              type="text"
              name="first"
              id="first"
              onChange={(event) => handleInputChange({...user.name, first: event.target.value}, 'name')}
              value={user.name.first}
            />
          </Col>
          <Col sm={4}>
            <Input
              required
              type="text"
              name="last"
              id="last"
              onChange={(event) => handleInputChange({...user.name, last: event.target.value}, 'name')}
              value={user.name.last}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="email" sm={2}>Email</Label>
          <Col sm={10}>
            <Input
              type="email"
              required
              name="email"
              id="gmail"
              onChange={(event) => handleInputChange(event.target.value, 'email')}
              value={user.email}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="username" sm={2}>Username</Label>
          <Col sm={10}>
            <Input
              type="text"
              required
              name="username"
              id="username"
              onChange={(event) => handleInputChange(event.target.value, 'username')}
              value={user.username}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="password" sm={2}>Password</Label>
          <Col sm={10}>
            <Input
              type="password"
              required
              name="password"
              id="password"
              onChange={(event) => handleInputChange(event.target.value, 'password')}
              value={user.passowrd}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="dob" sm={2}>DOB</Label>
          <Col sm={10}>
            <Input
              type="text"
              required
              name="dob"
              id="dob"
              onChange={(event) => handleInputChange(event.target.value, 'dob')}
              value={user.dob}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="cell" sm={2}>Phone</Label>
          <Col sm={10}>
            <Input
              type="text"
              required
              name="cell"
              id="cell"
              onChange={(event) => handleInputChange(event.target.value, 'cell')}
              value={user.cell}
            />
          </Col>
        </FormGroup>

      </ModalBody>

      <ModalFooter>
        <Button color="primary" type={'submit'}>Submit</Button>
      </ModalFooter>
    </Form>
  </Modal>
);

AddModal.propTypes = {
  user: PropTypes.object,
  errors: PropTypes.array,
  toggleModal: PropTypes.func,
  activeModal: PropTypes.bool,
  handleAddUser: PropTypes.func,
  handleAddBucket: PropTypes.func,
  handleInputChange: PropTypes.func,
};

export default AddModal;
