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

    let categoriesClasses = styles.categories;

    if (!menuOpened) {
        categoriesClasses = `${styles.sectionCategories} hidden`;
    }

    return (
        <div className={styles.container}>
            <button className={styles.menuButton} onClick={toggleMenu}>menu</button>
            <section className={categoriesClasses}>
                {children}
            </section>
        </div>
    );
}; 