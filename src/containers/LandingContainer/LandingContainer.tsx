import React, { Component } from 'react';
import TableComponent from '../../components/TableComponent/TableComponent';
import { Navbar, Container, Nav, Button, Tab, Col, Row } from 'react-bootstrap';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

interface LandingContainerProp { }

const btn = { backgroundColor: '#212529' };

export default class LandingContainer extends Component<LandingContainerProp> {
    constructor(props: LandingContainerProp) {
        super(props);
    }

    render(): React.ReactNode {
        return <>
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand>Serendib Foundation</Navbar.Brand>
                </Container>
            </Navbar>
            <Container style={btn} fluid>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row style={btn}>
                        <Col sm={1}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Student</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Sponsors</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={11}>
                            <QueryClientProvider client={queryClient}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <TableComponent type={'student'} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <TableComponent type={'sponsor'} />
                                    </Tab.Pane>
                                </Tab.Content>
                            </QueryClientProvider>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </>
    }
}