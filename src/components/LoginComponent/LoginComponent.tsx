import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const cacheKey = "isLoggedIn";

const LoginComponent = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const handleLogin = () => {
    if (email === "geetha" && password === "geetha12345") {
      props.handleLogin();
      localStorage.setItem(cacheKey, 'true');
    } else {
      setLoginFailed(true);
    }
  };

  return (
    <Modal show={props.show} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleLogin}>
          Login
        </Button>
        {loginFailed && (
          <Form.Label>
            <div
              style={{
                backgroundColor: "rgba(255, 100, 100, 0.85)",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              Login failed. Please try again.
            </div>
          </Form.Label>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default LoginComponent;
