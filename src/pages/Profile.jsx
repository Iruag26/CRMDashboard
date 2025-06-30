// src/pages/Profile.jsx
import { useState } from 'react';
import PageWrapper  from '../components/PageWrapper';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Profile() {
  /* mock user */
  const initial = {
    avatar:  'https://i.pravatar.cc/150?img=26',
    first:   'Alexa',
    last:    'Rawles',
    email:   'arawles@gmail.com',
    gender:  'Female',
    country: 'USA',
    language:'English',
    timezone:'UTC-05:00',
    password:'••••••••',
  };

  /* state */
  const [user, setUser]   = useState(initial);
  const [edit, setEdit]   = useState(false);
  const today = new Date().toLocaleDateString('en-US',
                 { weekday:'short', day:'2-digit', month:'short', year:'numeric' });

  const change  = e => setUser({ ...user, [e.target.name]: e.target.value });
  const avatar  = e => { const f = e.target.files[0]; if (f) setUser({ ...user, avatar: URL.createObjectURL(f) }); };
  const save    = () => setEdit(false);
  const cancel  = () => { setUser(initial); setEdit(false); };

  /* UI */
  return (
    <PageWrapper>
      {/* --- top bar --- */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <div className="fw-semibold fs-2 text-white">Welcome, Alexa</div>
          <small className="text-muted">{today}</small>
        </div>

        <div className="d-flex align-items-center gap-3">
          <InputGroup size="sm" style={{ maxWidth: 200 }}>
            <InputGroup.Text className="bg-light">
              <i className="bi bi-search" />
            </InputGroup.Text>
            <Form.Control placeholder="Search" />
          </InputGroup>

          {/* >>> Edit / Save toggle button <<< */}
          <Button
            size="sm"
            variant={edit ? 'primary' : 'outline-primary'}
            onClick={() => (edit ? save() : setEdit(true))}
          >
            {edit ? 'Save' : 'Edit'}
          </Button>
        </div>
      </div>

      {/* --- profile card --- */}
      <div className="bg-white rounded shadow-sm">
        <div
          style={{
            height: 50,
            background: '#003366',
            borderTopLeftRadius: '0.3rem',
            borderTopRightRadius: '0.3rem',
          }}
        />

        <div className="p-4">
          {/* avatar + name */}
          <div className="d-flex align-items-center mb-4 gap-3">
            <div style={{ position: 'relative', width: 90 }}>
              <img
                src={user.avatar}
                alt="avatar"
                className="rounded-circle border"
                style={{
                  width: 90,
                  height: 90,
                  objectFit: 'cover',
                  cursor: edit ? 'pointer' : 'default',
                }}
              />
              {edit && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    id="avatarInput"
                    onChange={avatar}
                  />
                  <label
                    htmlFor="avatarInput"
                    className="position-absolute bg-white rounded-circle p-1"
                    style={{ bottom: 0, right: 0, cursor: 'pointer' }}
                  >
                    <i className="bi bi-pencil-fill small" />
                  </label>
                </>
              )}
            </div>
            <div>
              <h4 className="mb-0">
                {user.first} {user.last}
              </h4>
              <small className="text-muted">{user.email}</small>
            </div>
          </div>

          {/* form */}
          <Form>
            <Row className="gx-3 gy-2 mb-3">
              <Col md={6}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="first"
                  value={user.first}
                  onChange={change}
                  disabled={!edit}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="last"
                  value={user.last}
                  onChange={change}
                  disabled={!edit}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={change}
                  disabled={!edit}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  name="country"
                  value={user.country}
                  onChange={change}
                  disabled={!edit}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={user.gender}
                  onChange={change}
                  disabled={!edit}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label>Time Zone</Form.Label>
                <Form.Control
                  name="timezone"
                  value={user.timezone}
                  onChange={change}
                  disabled={!edit}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Language</Form.Label>
                <Form.Control
                  name="language"
                  value={user.language}
                  onChange={change}
                  disabled={!edit}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Email</Form.Label>
                <Form.Control value={user.email} disabled />
              </Col>
            </Row>

            {/* Cancel button appears only while editing */}
            {edit && (
              <div className="d-flex justify-content-end">
                <Button variant="secondary" size="sm" onClick={cancel}>
                  Cancel
                </Button>
              </div>
            )}
          </Form>
        </div>
      </div>
    </PageWrapper>
  );
}
