import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import useLocale from "../../../hooks/useLocale";
import IconAngleDown from "../../../icons/IconAngleDown";
import IconAngleUp from "../../../icons/IconAngleUp";
import IconCalendar from "../../../icons/IconCalendar";
import { formatDate } from "../../../util/dateUtils";
import { translateValue } from "../../../util/translateUtils";
import styles from "./dateSelector.module.scss";
import DateSelectorMenu from "./DateSelectorMenu";

interface Props {
  dateTypes: string[];
  endDate: Date | null;
  isCustomDate: boolean;
  name: string;
  onChangeDateTypes: (value: string[]) => void;
  onChangeEndDate: (date: Date | null) => void;
  onChangeStartDate: (date: Date | null) => void;
  startDate: Date | null;
  toggleIsCustomDate: () => void;
}

const DateSelector: FunctionComponent<Props> = ({
  dateTypes,
  endDate,
  isCustomDate,
  name,
  onChangeDateTypes,
  onChangeEndDate,
  onChangeStartDate,
  startDate,
  toggleIsCustomDate
}) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const backBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const toggleBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const dateSelector = React.useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target;
    const current = dateSelector && dateSelector.current;

    // Close menu when clicking outside of the component
    if (!(current && target instanceof Node && current.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  const ensureMenuIsOpen = React.useCallback(() => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  }, [isMenuOpen]);

  const isComponentFocused = React.useCallback(() => {
    const active = document.activeElement;
    const current = dateSelector && dateSelector.current;

    if (current && active instanceof Node && current.contains(active)) {
      return true;
    }
    return false;
  }, [dateSelector]);

  const handleDocumentFocusin = React.useCallback(() => {
    if (!isComponentFocused()) {
      setIsMenuOpen(false);
    }
  }, [isComponentFocused]);

  const handleDocumentKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (!isComponentFocused()) return;

      switch (event.key) {
        case "ArrowUp":
          ensureMenuIsOpen();
          event.preventDefault();
          break;
        case "ArrowDown":
          ensureMenuIsOpen();
          event.preventDefault();
          break;
        case "Escape":
          setIsMenuOpen(false);
          event.preventDefault();
          break;
      }
    },
    [ensureMenuIsOpen, isComponentFocused]
  );

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  React.useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleDocumentKeyDown);
    document.addEventListener("focusin", handleDocumentFocusin);
    // Clean up event listener to prevent memory leaks
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleDocumentKeyDown);
      document.removeEventListener("focusin", handleDocumentFocusin);
    };
  }, [handleDocumentFocusin, handleDocumentKeyDown]);

  const handleToggleIsCustomDate = () => {
    if (isCustomDate) {
      setTimeout(() => {
        if (toggleBtnRef && toggleBtnRef.current) {
          toggleBtnRef.current.focus();
        }
      }, 1);
    } else {
      setTimeout(() => {
        if (backBtnRef && backBtnRef.current) {
          backBtnRef.current.focus();
        }
      }, 1);
    }

    toggleIsCustomDate();
  };

  const isSelected = isCustomDate
    ? !!startDate || !!endDate
    : !!dateTypes.length;

  const selectedText = React.useMemo(() => {
    if (isCustomDate) {
      return !!startDate || !!endDate
        ? `${formatDate(startDate, undefined, locale)} -
            ${formatDate(endDate, undefined, locale)}`
        : "";
    }
    const dateTypeLabels = dateTypes
      .map(val => {
        return translateValue("commons.dateSelector.dateType", val, t);
      })
      .sort();
    if (dateTypeLabels.length > 1) {
      return `${dateTypeLabels[0]} + ${dateTypeLabels.length - 1}`;
    } else {
      return dateTypeLabels.join();
    }
  }, [dateTypes, endDate, isCustomDate, locale, startDate, t]);

  return (
    <div className={styles.dateSelector} ref={dateSelector}>
      <button
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        aria-label={t("commons.dateSelector.title")}
        className={styles.button}
        onClick={toggleMenu}
        type="button"
      >
        <div className={styles.iconWrapper}>
          <IconCalendar className={styles.iconCalendar} />
        </div>
        <div className={styles.info}>
          <div className={styles.buttonTextWrapper}>
            {selectedText || t("commons.dateSelector.title")}
          </div>
        </div>
        <div className={styles.arrowWrapper}>
          {isMenuOpen ? <IconAngleUp /> : <IconAngleDown />}
        </div>
      </button>
      {isSelected && <div className={styles.isSelectedIndicator} />}
      <DateSelectorMenu
        backBtnRef={backBtnRef}
        dateTypes={dateTypes}
        endDate={endDate}
        isCustomDate={isCustomDate}
        isOpen={isMenuOpen}
        name={name}
        onChangeDateTypes={onChangeDateTypes}
        onChangeEndDate={onChangeEndDate}
        onChangeStartDate={onChangeStartDate}
        startDate={startDate}
        toggleBtnRef={toggleBtnRef}
        toggleIsCustomDate={handleToggleIsCustomDate}
        onCloseMenu={closeMenu}
      />
    </div>
  );
};

export default DateSelector;
