import { IconClose } from "hds-react";
import React, { FunctionComponent } from "react";

import { formatMessage } from "../../translation/TranslationUtils";
import { Category as CategoryType } from "../../types";
import styles from "./category.module.scss";

interface Props {
  category: CategoryType;
  onRemove: (category: CategoryType) => void;
}

const Category: FunctionComponent<Props> = ({ category, onRemove }) => {
  const handleRemove = () => {
    onRemove(category);
  };

  return (
    <div className={styles.category}>
      <button
        type="button"
        className={styles.closeButton}
        onClick={handleRemove}
        aria-label={formatMessage("commons.category.ariaButtonRemove", {
          category: category.text
        })}
      >
        <IconClose />
      </button>
      {category.text}
    </div>
  );
};

export default Category;