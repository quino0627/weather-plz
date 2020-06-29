import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { changeTheme } from '../modules/styles';

export default function useTheme(): {
  theme: string;
  onToggle: () => void;
  themeMount: boolean;
} {
  const dispatch = useDispatch();
  const [themeMount, setThemeMount] = useState(false);
  const theme = useSelector((state: RootState) => state.styles.theme);

  const onToggle = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark');
      dispatch(changeTheme('dark'));
    } else {
      window.localStorage.setItem('theme', 'light');
      dispatch(changeTheme('light'));
    }
  };
  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      dispatch(changeTheme(localTheme));
    } else {
      window.localStorage.setItem('theme', 'light');
    }
    setThemeMount(true);
  }, []);
  return { theme, onToggle, themeMount };
}
