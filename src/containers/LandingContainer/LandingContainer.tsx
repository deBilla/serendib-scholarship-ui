import React, { Component } from 'react';
import TableComponent from '../../components/TableComponent/TableComponent';
import { Navbar, Container, Nav, Button, Tab, Col, Row } from 'react-bootstrap';
import { QueryClient, QueryClientProvider } from "react-query";
import logo from '../../assets/images/logo1.png';

const queryClient = new QueryClient();

interface LandingContainerProp { }

const btn = { backgroundColor: '#212529' };

export default class LandingContainer extends Component<LandingContainerProp> {
    constructor(props: LandingContainerProp) {
        super(props);
    }

    render(): React.ReactNode {
        return <>
            <Navbar bg="dark" variant="dark" fixed="top" style={{height: '70px'}}>
                <Container fluid>
                    <Navbar.Brand style={{backgroundColor: 'black', borderRadius: '10px'}}><span style={{margin: '10px'}}>Serendib Foundation</span></Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link href="http://credoxyz.epizy.com/?i=1"><img style={{width: '50px', height: '50px', borderRadius: '50px'}} src={logo} /></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container style={{...btn, top: '70px', position: 'relative'}} fluid>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row style={{backgroundColor: '#212121'}}>
                        <Col sm={1} style={{backgroundColor: 'black', width: '150px', height: '100%', position: 'fixed'}}>
                            <Nav style={{marginTop: '15px'}} variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first" style={{textAlign: 'center'}}>Student</Nav.Link>
                                </Nav.Item>
                                <Nav.Item  style={{marginTop: '15px'}}>
                                    <Nav.Link eventKey="second" style={{textAlign: 'center'}}>Sponsors</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={11} style={{marginLeft: '150px', position: 'relative'}}>
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