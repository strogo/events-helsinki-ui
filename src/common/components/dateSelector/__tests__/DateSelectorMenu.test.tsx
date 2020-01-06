import * as React from "react";
import { MemoryRouter } from "react-router";
import renderer from "react-test-renderer";

import DateSelectorMenu from "../DateSelectorMenu";

test("DateSelectorMenu matches snapshot", () => {
  const component = renderer.create(
    <MemoryRouter>
      <DateSelectorMenu
        dateTypes={["type1", "type2"]}
        endDate={new Date("2019-09-31")}
        isCustomDate={false}
        isOpen={true}
        onChangeDateTypes={() => {}}
        onChangeEndDate={() => {}}
        onChangeStartDate={() => {}}
        startDate={new Date("2019-08-01")}
        toggleIsCustomDate={() => {}}
        toggleMenu={() => {}}
      />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};