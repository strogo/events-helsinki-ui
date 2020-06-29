import { IconHome } from "hds-react";
import React from "react";
import { useTranslation } from "react-i18next";

import MultiSelectDropdown, {
  Option
} from "../../../common/components/multiSelectDropdown/MultiSelectDropdown";
import { usePlaceListQuery } from "../../../generated/graphql";
import useDebounce from "../../../hooks/useDebounce";
import useLocale from "../../../hooks/useLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import isClient from "../../../util/isClient";
import PlaceText from "../PlaceText";
const { getPlaceDetailsFromCache } = isClient
  ? // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("../utils")
  : { getPlaceDetailsFromCache: null };

interface Props {
  name: string;
  setPlaces: (places: string[]) => void;
  value: string[];
}

const PlaceSelector: React.FC<Props> = ({ name, setPlaces, value }) => {
  const { t } = useTranslation();
  const locale = useLocale();

  const [placeOptions, setPlaceOptions] = React.useState<Option[]>([]);
  const [internalInputValue, setInternalInputValue] = React.useState("");
  const searchValue = useDebounce(internalInputValue, 300);

  const { data: placesData, loading: loadingPlaces } = usePlaceListQuery({
    variables: {
      pageSize: 10,
      text: searchValue
    }
  });

  React.useEffect(() => {
    if (loadingPlaces) return;
    const options: Option[] =
      (placesData &&
        placesData.placeList.data.map(place => ({
          text: getLocalisedString(place.name || {}, locale),
          value: place.id || ""
        }))) ||
      [];

    setPlaceOptions(options.sort((a, b) => (a.text > b.text ? 1 : -1)));
  }, [internalInputValue, loadingPlaces, locale, placesData]);

  const renderOptionText = (id: string) => {
    try {
      const place = getPlaceDetailsFromCache(id);

      return getLocalisedString(
        (place && place.placeDetails.name) || {},
        locale
      );
    } catch {
      return <PlaceText id={id} />;
    }
  };

  return (
    <>
      <MultiSelectDropdown
        checkboxName="placeOptions"
        icon={<IconHome />}
        inputValue={internalInputValue}
        name={name}
        onChange={setPlaces}
        options={placeOptions}
        renderOptionText={renderOptionText}
        selectAllText={t("eventSearch.search.selectAllPlaces")}
        setInputValue={setInternalInputValue}
        showSelectAll={true}
        title={t("eventSearch.search.titleDropdownPlace")}
        value={value}
      />
    </>
  );
};

export default PlaceSelector;