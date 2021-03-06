import React from 'react';

import MobileMenu, { useMobileMenuContext } from '../mobileMenu/MobileMenu';
import MobileNavbar from '../mobileNavbar/MobileNavbar';
import styles from './mobileNavigation.module.scss';

const MobileNavigation: React.FC = () => {
  const { isMobileMenuOpen, toggleMenu } = useMobileMenuContext();

  const disabledBodyScrolling = () => {
    const body = document.body;

    body.classList.add('scrollDisabledOnMobile');
  };

  const enableBodyScrolling = () => {
    const body = document.body;

    body.classList.remove('scrollDisabledOnMobile');
  };

  const ensureMenuIsClosed = () => {
    if (isMobileMenuOpen) {
      toggleMenu();
    }
  };

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      disabledBodyScrolling();
    } else {
      enableBodyScrolling();
    }
  }, [isMobileMenuOpen]);

  return (
    <div className={styles.mobileNavigation}>
      <MobileNavbar
        isMenuOpen={isMobileMenuOpen}
        onCloseMenu={ensureMenuIsClosed}
        onToggleMenu={toggleMenu}
      />
      <MobileMenu isMenuOpen={isMobileMenuOpen} onClose={ensureMenuIsClosed} />
    </div>
  );
};

export default MobileNavigation;
