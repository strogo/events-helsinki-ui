import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { MockLink } from "apollo-link-mock";
import { mount } from "enzyme";
import * as React from "react";

import i18n from "../../common/translation/i18n/init.server";
import ServerApp from "../ServerApp";

test("ServerApp matches snapshot", () => {
  function createClient() {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new MockLink([])
    });
  }

  const client = createClient();

  const tree = mount(
    <ServerApp client={client} context={{}} i18n={i18n} url="/fi/home" />
  );
  expect(tree.html()).toMatchSnapshot();
});

export {};
