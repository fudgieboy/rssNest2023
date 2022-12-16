import React from "react";
import Component, {decVal, incVal} from "./Main";
import {expect} from "chai";

it(`${Component.name} renders without crashing`, () => {
  shallow(<Component />);
});