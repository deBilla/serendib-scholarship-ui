import TableComponent from "../../components/TableComponent/TableComponent";
import { Navbar, Container, Nav, Tab, Col, Row, Button } from "react-bootstrap";
import { QueryClient, QueryClientProvider } from "react-query";
import logo from "../../assets/images/logo.png";
import { FaSignOutAlt } from "react-icons/fa";
import React, { useState, useEffect } from "react";

const queryClient = new QueryClient();

const LandingContainer = (props: any) => {
  const [isMobileView, setIsMobileView] = useState<boolean>(true);

  useEffect(() => {
    setIsMobileView(window.innerWidth < 768);
  }, []);

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        fixed="top"
        style={{ height: "70px", border: "1px solid black" }}
      >
        <Container fluid>
          <Navbar.Brand
            style={{ backgroundColor: "black", borderRadius: "10px" }}
          >
            <span style={{ margin: "10px" }}>Serendib Foundation</span>
          </Navbar.Brand>
          {isMobileView && (
            <Navbar.Brand>
              <img
                alt="Dimuthu"
                style={{ width: "50px", height: "50px", borderRadius: "50px" }}
                src={logo}
              ></img>
            </Navbar.Brand>
          )}
          <Button variant="danger" onClick={props.handleLogout}>
            <FaSignOutAlt />
          </Button>
        </Container>
      </Navbar>
      <Container
        style={{
          marginTop: "60px",
          padding: "20px",
          height: "100%",
          backgroundColor: "black",
        }}
        fluid
      >
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row style={{ height: "100%", backgroundColor: "black" }}>
            <Col
              sm={1}
              className="bg-dark sidebar"
              style={{ backgroundColor: "black" }}
            >
              <Nav
                style={{ marginTop: "15px" }}
                variant="pills"
                className="flex-column"
              >
                <Nav.Item>
                  <Nav.Link eventKey="first" style={{ textAlign: "center" }}>
                    Student
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  style={{
                    marginTop: "15px",
                    height: "100%",
                    marginBottom: !isMobileView ? "300px" : "0px",
                  }}
                >
                  <Nav.Link eventKey="second" style={{ textAlign: "center" }}>
                    Sponsors
                  </Nav.Link>
                </Nav.Item>
                {!isMobileView && (
                  <Nav.Item className="mt-auto" style={{ height: "100%" }}>
                    <Nav.Link
                      href="https://billa-code.medium.com/"
                      style={{ textAlign: "center", height: "100%" }}
                    >
                      <img
                        alt="Dimuthu"
                        style={{ width: "100px", height: "100px" }}
                        src={logo}
                      />
                    </Nav.Link>
                  </Nav.Item>
                )}
              </Nav>
            </Col>
            <Col sm={11} className="main-content" style={{ height: "100%" }}>
              <QueryClientProvider client={queryClient}>
                <Tab.Content style={{ height: "100%" }}>
                  <Tab.Pane eventKey="first" style={{ height: "100%" }}>
                    <TableComponent type={"student"} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <TableComponent type={"sponsor"} />
                  </Tab.Pane>
                </Tab.Content>
              </QueryClientProvider>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
};

export default LandingContainer;
