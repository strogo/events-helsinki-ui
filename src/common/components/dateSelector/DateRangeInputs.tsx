import { isPast } from "date-fns";
import React, { ChangeEvent, MutableRefObject } from "react";
import { WithTranslation, withTranslation } from "react-i18next";

import IconCalendarAdd from "../../../icons/IconCalendarAdd";
import {
  convertFinnishDateStrToDate,
  formatDate
} from "../../../util/dateUtils";
import styles from "./dateRangeInputs.module.scss";

interface Props extends WithTranslation {
  endDateRaw: string;
  endDateRef?: MutableRefObject<HTMLInputElement | null>;
  // onBlur method is overriden by ReactFatePicker so name this as onBlurInput
  onBlurInput: (
    ref: MutableRefObject<HTMLInputElement | null>,
    value: Date | null
  ) => void;
  setCounter: (counter: number) => void;
  endDate: Date | null;
  setEndDateRaw: (val: string) => void;
  setStartDateRaw: (val: string) => void;
  startDate: Date | null;
  startDateRaw: string;
  startDateRef?: MutableRefObject<HTMLInputElement | null>;
}

// Use class instead of function component so the ref is passed correctly by ReactDatePicker
class DateRangeInputs extends React.Component<Props> {
  handleEndDateRawChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { setEndDateRaw } = this.props;

    setEndDateRaw(e.target.value);
  };

  handleStartDateRawChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { setStartDateRaw } = this.props;

    setStartDateRaw(e.target.value);
  };

  handleBlurStartDate = () => {
    const {
      onBlurInput,
      setStartDateRaw,
      startDate,
      startDateRaw,
      startDateRef
    } = this.props;
    let newDate = convertFinnishDateStrToDate(startDateRaw);

    if (newDate) {
      if (isPast(newDate)) {
        newDate = startDate;
      }
      if (startDateRef) {
        onBlurInput(startDateRef, newDate);
      }

      setStartDateRaw(formatDate(newDate));
    } else {
      setStartDateRaw(formatDate(startDate));
    }
  };

  handleBlurEndDate = () => {
    const {
      endDate,
      endDateRaw,
      endDateRef,
      onBlurInput,
      setEndDateRaw
    } = this.props;
    let newDate = convertFinnishDateStrToDate(endDateRaw);

    if (newDate) {
      if (isPast(newDate)) {
        newDate = endDate;
      }
      if (endDateRef) {
        onBlurInput(endDateRef, newDate);
      }

      setEndDateRaw(formatDate(newDate));
    } else {
      setEndDateRaw(formatDate(endDate));
    }
  };

  render() {
    const {
      i18n,
      endDate,
      endDateRaw,
      endDateRef,
      onBlurInput,
      t,
      tReady,
      setCounter,
      setEndDateRaw,
      setStartDateRaw,
      startDate,
      startDateRaw,
      startDateRef,
      ...rest
    } = this.props;

    return (
      <div className={styles.dateRangeInputsContainer}>
        <div className={styles.dateInputWrapper}>
          <label>{t("commons.dateSelector.labelStartDate")}</label>
          <div className={styles.formatInfo}>
            {t("commons.dateSelector.infoDate")}
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.input}>
              <input
                {...rest}
                ref={startDateRef}
                onBlur={this.handleBlurStartDate}
                onChange={this.handleStartDateRawChange}
                onFocus={() => setCounter(1)}
                value={startDateRaw}
              />
            </div>
            <div className={styles.icon}>
              <IconCalendarAdd />
            </div>
          </div>
        </div>
        <div className={styles.dateSeparator}>—</div>
        <div className={styles.dateInputWrapper}>
          <label>{t("commons.dateSelector.labelEndDate")}</label>
          <div className={styles.formatInfo}>
            {t("commons.dateSelector.infoDate")}
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.input}>
              <input
                {...rest}
                ref={endDateRef}
                onBlur={this.handleBlurEndDate}
                onChange={this.handleEndDateRawChange}
                onFocus={() => setCounter(2)}
                value={endDateRaw}
              />
            </div>
            <div className={styles.icon}>
              <IconCalendarAdd />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(DateRangeInputs);
