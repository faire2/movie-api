import React from 'react';
import renderer from 'react-test-renderer';
import {ErrorMsgPanel} from "./ErrorMsgPanel";

// snapshot test
describe("Error panel", () => {
    test("snapshot", () => {
        const component = renderer.create(<ErrorMsgPanel message={"Test message"}/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot()
    })
});