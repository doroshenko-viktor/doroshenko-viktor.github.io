import { ReactNode, useState } from "react"
import styles from './SectionCategories.module.css';

type Props = {
  children: ReactNode[] | ReactNode
}

export const SectionCategories: React.FC<Props> = ({ children }) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setMenuOpened(!menuOpened);
  };

  let categoriesClasses = styles.sectionCategories;

  if (!menuOpened) {
    categoriesClasses = `${styles.sectionCategories} hidden`;
  }

  return (
    <div className={styles.container}>
      <button className={styles.menuButton} onClick={toggleMenu}>menu</button>
      <section className={categoriesClasses}>
        {children}
      </section>
      <p className={styles.waiver}>For anyone who may also read this: These are not articles but notes; they may be incomplete or subject to change over time.</p>
    </div>
  );
}; 
