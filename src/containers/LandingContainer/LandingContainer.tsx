import React, { Component } from 'react';
import StudentTableContainer from '../stduentDetailsContainer/StduentDetailsContainer';

interface LandingContainerProp { }

export default class LandingContainer extends Component<LandingContainerProp> {
    constructor(props: LandingContainerProp) {
        super(props);
    }

    render(): React.ReactNode {
        return <>
            <StudentTableContainer />
        </>
    }
}