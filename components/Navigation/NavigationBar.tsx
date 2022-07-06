import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './NavigationBar.module.css';

export interface NavigationItem {
    getElement(): React.ReactNode;
}

export class LinkNavigationItem implements NavigationItem {
    constructor(private readonly title: string, private readonly path: string) { }

    getElement(): ReactNode {
        return (
            <Link href={this.path}>
                <a className={styles.navitemContent}>{this.title}</a>
            </Link>
        );
    }
}

export class ActionNavigationItem implements NavigationItem {
    constructor(private readonly title: string, private readonly action: () => void) { }

    getElement(): ReactNode {
        return (
            <button className={styles.navitemContent} onClick={this.action}>
                {this.title}
            </button>
        );
    }
}

type Props = {
    items: (LinkNavigationItem | ActionNavigationItem)[]
};

const NavigationBar: React.FC<Props> = ({ items }) => {
    return (
        <ul className={styles.navbar}>
            {items.map((item, index) => {
                return <li key={index} className={styles.navitem}>
                    {item.getElement()}
                    <span className={styles.separator}>|</span>
                </li>;
            })}
        </ul >
    );
};

export default NavigationBar;