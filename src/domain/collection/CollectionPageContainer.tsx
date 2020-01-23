import React from "react";
import { useParams } from "react-router";

import isClient from "../../util/isClient";
import Layout from "../app/layout/Layout";
import CollectionHero from "./collectionHero/CollectionHero";
import styles from "./collectionPage.module.scss";
import CurratedEventList from "./curratedEventList/CurratedEventList";
import EventList from "./eventList/EventList";
import SimilarCollections from "./similarCollections/SimilarCollections";

interface RouteParams {
  id: string;
}

const CollectionPageContainer: React.FC = () => {
  const params = useParams<RouteParams>();
  console.log("Collection:", params.id);

  React.useEffect(() => {
    // Scroll to top when collection changes. Ignore this on SSR because window doesn't exist
    if (isClient) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <Layout>
      <div className={styles.collectionPageWrapper}>
        <CollectionHero />
        <CurratedEventList />
        <EventList />
        <SimilarCollections />
      </div>
    </Layout>
  );
};

export default CollectionPageContainer;