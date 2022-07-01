import { ReactNode } from "react";
import styles from './MainPageLayout.module.css';

type Props = {
    header: ReactNode;
    alt: ReactNode;
    children: ReactNode;
};

export const MainPageLayout: React.FC<Props> = ({ header, alt, children }) => {
    return (<>
        <div className={styles.frame}>
            <div className={styles.alt}>
                <div className={styles.header}>
                    {header}
                </div>
                {alt}
            </div>
            <main className={styles.main}>

                {children}
            </main>
        </div>
    </>);
};