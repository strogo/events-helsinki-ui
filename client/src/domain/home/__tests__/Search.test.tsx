import * as React from "react";
import { MemoryRouter } from "react-router";
import renderer from "react-test-renderer";

import Search from "../Search";

test("Search matches snapshot", () => {
  const component = renderer.create(
    <MemoryRouter>
      <Search />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
