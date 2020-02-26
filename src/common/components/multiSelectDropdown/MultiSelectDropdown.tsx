import classNames from "classnames";
import React from "react";

import useKeyboardNavigation from "../../../hooks/useDropdownKeyboardNavigation";
import IconAngleDown from "../../../icons/IconAngleDown";
import IconAngleUp from "../../../icons/IconAngleUp";
import Checkbox from "../input/Checkbox";
import ScrollIntoViewWithFocus from "../scrollIntoViewWithFocus/ScrollIntoViewWithFocus";
import DropdownMenu from "./DropdownMenu";
import styles from "./multiSelectDropdown.module.scss";

type Option = {
  text: string;
  value: string;
};

interface Props {
  icon: React.ReactElement;
  name: string;
  onChange: (values: string[]) => void;
  options: Option[];
  title: string;
  value: string[];
}

const Dropdown: React.FC<Props> = ({
  icon,
  name,
  onChange,
  options,
  title,
  value
}) => {
  const [input, setInput] = React.useState("");
  const inputWrapper = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const clearButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const filteredOptions = React.useMemo(
    () =>
      options.filter(option =>
        option.text.toLowerCase().includes(input.toLowerCase())
      ),
    [input, options]
  );
  const dropdown = React.useRef<HTMLDivElement | null>(null);
  const [
    focusedIndex,
    setupKeyboardNav,
    teardownKeyboardNav
  ] = useKeyboardNavigation({
    container: dropdown,
    listLength: filteredOptions.length
  });
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isComponentFocused = React.useCallback(() => {
    const active = document.activeElement;
    const current = dropdown && dropdown.current;

    if (current && active instanceof Node && current.contains(active)) {
      return true;
    }
    return false;
  }, [dropdown]);

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target;
    const current = dropdown && dropdown.current;

    // Close menu when clicking outside of the component
    if (!(current && target instanceof Node && current.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  const toggleOption = React.useCallback(
    (option: string) => {
      onChange(
        value.includes(option)
          ? value.filter(v => v !== option)
          : [...value, option]
      );
    },
    [onChange, value]
  );

  const ensureDropdownIsOpen = React.useCallback(() => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  }, [isMenuOpen]);

  const isInputWrapperFocused = () => {
    const target = document.activeElement;
    const current = inputWrapper.current;

    if (!(current && target instanceof Node && current.contains(target))) {
      return false;
    }

    return true;
  };

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const handleDocumentKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      // Handle keyboard events only if current element is focused
      if (!isComponentFocused()) return;
      switch (event.key) {
        // Close menu on ESC key
        case "Escape":
          setIsMenuOpen(false);
          break;
        case "ArrowUp":
          ensureDropdownIsOpen();
          break;
        case "ArrowDown":
          ensureDropdownIsOpen();
          break;
        case "Enter":
          if (isInputWrapperFocused()) {
            toggleMenu();
          }
          event.preventDefault();
      }
    },
    [ensureDropdownIsOpen, isComponentFocused, toggleMenu]
  );

  const handleDocumentFocusin = (event: FocusEvent) => {
    const target = event.target;
    const current = dropdown && dropdown.current;

    if (!(current && target instanceof Node && current.contains(target))) {
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
    setupKeyboardNav();
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleDocumentKeyDown);
    document.addEventListener("focusin", handleDocumentFocusin);
    // Clean up event listener to prevent memory leaks
    return () => {
      teardownKeyboardNav();
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleDocumentKeyDown);
      document.removeEventListener("focusin", handleDocumentFocusin);
    };
  }, [handleDocumentKeyDown, setupKeyboardNav, teardownKeyboardNav]);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    toggleOption(val);
  };

  const handleClear = () => {
    onChange([]);
  };

  const handleInputWrapperClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    toggleMenu();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    ensureDropdownIsOpen();
    setInput(event.target.value);
  };

  return (
    <div className={styles.dropdown} ref={dropdown}>
      <div
        className={styles.inputWrapper}
        onClick={handleInputWrapperClick}
        ref={inputWrapper}
      >
        {!!value.length && <div className={styles.isSelectedIndicator} />}
        <div className={styles.iconWrapper}>{icon}</div>
        <div className={styles.title}>
          <input
            ref={inputRef}
            placeholder={title}
            onChange={handleInputChange}
            value={input}
          />
        </div>
        <div className={styles.arrowWrapper}>
          {isMenuOpen ? <IconAngleUp /> : <IconAngleDown />}
        </div>
      </div>
      <DropdownMenu
        buttonRef={clearButtonRef}
        isOpen={isMenuOpen}
        onClear={handleClear}
      >
        {filteredOptions.map((option, index) => {
          const isFocused = index === focusedIndex;

          const setFocus = (ref: HTMLLabelElement) => {
            if (isFocused && ref) {
              ref.focus();
            }
          };

          return (
            <ScrollIntoViewWithFocus key={option.value} isFocused={isFocused}>
              <Checkbox
                ref={setFocus}
                checked={value.includes(option.value)}
                name={name}
                onChange={handleValueChange}
                value={option.value}
                className={classNames(styles.dropdownItem, {
                  [styles["dropdownItem--first"]]: index === 0,
                  [styles["dropdownItem--isFocused"]]: isFocused
                })}
              >
                {option.text}
              </Checkbox>
            </ScrollIntoViewWithFocus>
          );
        })}
      </DropdownMenu>
    </div>
  );
};

export default Dropdown;
