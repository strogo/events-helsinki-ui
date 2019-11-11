import classNames from "classnames";
import React, { ChangeEvent, FunctionComponent, MutableRefObject } from "react";
import { useLocation } from "react-router";

import { ReactComponent as AngleLeftIcon } from "../../../assets/icons/svg/angle-left.svg";
import { ReactComponent as AngleRightIcon } from "../../../assets/icons/svg/angle-right.svg";
import { ReactComponent as CalendarAddIcon } from "../../../assets/icons/svg/calendar-add.svg";
import { DATE_TYPES } from "../../../constants";
import { formatMessage } from "../../translation/utils";
import Checkbox from "../input/Checkbox";
import DateRangePicker from "./DateRangePicker";
import styles from "./dateSelectorMenu.module.scss"; // the locale you want

interface Props {
  backBtnRef: MutableRefObject<HTMLButtonElement | null>;
  dateTypes: string[];
  endDate: Date | null;
  isCustomDate: boolean;
  isOpen: boolean;
  onChangeDateTypes: (value: string[]) => void;
  onChangeEndDate: (date: Date | null) => void;
  onChangeStartDate: (date: Date | null) => void;
  startDate: Date | null;
  toggleBtnRef: MutableRefObject<HTMLButtonElement | null>;
  toggleIsCustomDate: () => void;
  toggleMenu: () => void;
}

const DateSelectorMenu: FunctionComponent<Props> = ({
  backBtnRef,
  dateTypes,
  endDate,
  isCustomDate,
  isOpen,
  onChangeDateTypes,
  onChangeEndDate,
  onChangeStartDate,
  startDate,
  toggleBtnRef,
  toggleIsCustomDate,
  toggleMenu
}) => {
  const { pathname } = useLocation();

  if (!isOpen) return null;

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (dateTypes.indexOf(event.target.value) !== -1) {
      onChangeDateTypes(dateTypes.filter(item => item !== event.target.value));
    } else {
      onChangeDateTypes([...dateTypes, event.target.value]);
    }
  };

  return (
    <div className={styles.dateSelectorMenu}>
      {!isCustomDate && (
        <div className={styles.wrapper}>
          <Checkbox
            checked={dateTypes.indexOf(DATE_TYPES.ALL) !== -1}
            name="date"
            onChange={handleCheckboxChange}
            value={DATE_TYPES.ALL}
          >
            {formatMessage("commons.dateSelector.dateTypeAll")}
          </Checkbox>
          <Checkbox
            checked={dateTypes.indexOf(DATE_TYPES.TODAY) !== -1}
            name="date"
            onChange={handleCheckboxChange}
            value={DATE_TYPES.TODAY}
          >
            {formatMessage("commons.dateSelector.dateTypeToday")}
          </Checkbox>
          <Checkbox
            checked={dateTypes.indexOf(DATE_TYPES.TOMORROW) !== -1}
            name="date"
            onChange={handleCheckboxChange}
            value={DATE_TYPES.TOMORROW}
          >
            {formatMessage("commons.dateSelector.dateTypeTomorrow")}
          </Checkbox>
          <Checkbox
            checked={dateTypes.indexOf(DATE_TYPES.THIS_WEEK) !== -1}
            name="date"
            onChange={handleCheckboxChange}
            value={DATE_TYPES.THIS_WEEK}
          >
            {formatMessage("commons.dateSelector.dateTypeThisWeek")}
          </Checkbox>
          <Checkbox
            checked={dateTypes.indexOf(DATE_TYPES.WEEKEND) !== -1}
            name="date"
            onChange={handleCheckboxChange}
            value={DATE_TYPES.WEEKEND}
          >
            {formatMessage("commons.dateSelector.dateTypeWeekend")}
          </Checkbox>
        </div>
      )}

      <button
        ref={toggleBtnRef}
        className={classNames(styles.button, styles.btnSelectDates, {
          [styles.hidden]: isCustomDate
        })}
        onClick={toggleIsCustomDate}
      >
        <CalendarAddIcon />
        <div className={styles.buttonText}>
          {formatMessage("commons.dateSelector.menu.buttonCustom")}
        </div>
        <AngleRightIcon />
      </button>

      <button
        ref={backBtnRef}
        className={classNames(styles.button, styles.btnBack, {
          [styles.hidden]: !isCustomDate
        })}
        onClick={toggleIsCustomDate}
      >
        <AngleLeftIcon />
        <div className={styles.buttonText}>
          {formatMessage("commons.dateSelector.menu.buttonBack")}
        </div>
      </button>

      {isCustomDate && (
        <div className={styles.wrapper}>
          <DateRangePicker
            endDate={endDate}
            locale={pathname.split("/")[1]}
            onChangeEndDate={onChangeEndDate}
            onChangeStartDate={onChangeStartDate}
            startDate={startDate}
          />
        </div>
      )}
      <button
        className={classNames(styles.button, styles.btnClose, {
          [styles.hidden]: !isCustomDate
        })}
        onClick={toggleMenu}
      >
        <div className={styles.buttonText}>
          {formatMessage("commons.dateSelector.menu.buttonClose")}
        </div>
      </button>
    </div>
  );
};

export default DateSelectorMenu;
