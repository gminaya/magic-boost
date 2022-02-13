import { useCallback, useState } from 'react';

export const useToggleDrawer = () => {
  const [drawerVisibility, setDrawerVisibility] = useState(false);

  const toggleDrawer = useCallback(() => {
    setDrawerVisibility(!drawerVisibility);
  }, []);

  return {
    toggleDrawer,
    drawerIsVisible: drawerVisibility
  };
};
