import Link from 'next/link';
import { select } from '../../lib/util';
import styles from './NoteListItem.module.css';

type Props = {
    link: string;
    title: string;
    description: string;
    publicationDate: Date;
};

const NoteListItem: React.FC<Props> = ({ link, title, description, publicationDate }) => {
    return (<>
        <li>
            <Link href={link} >
                <a>
                    <div className={styles.noteListItem}>
                        <header className={styles.noteHeader}>
                            <h2 className="note-title-heading">{title}</h2>
                        </header>
                        <main className={styles.noteBody}>
                            {description}
                        </main>
                        <footer className={styles.noteFooter}>
                            {getFormattedDate(publicationDate)}
                        </footer>
                    </div>
                </a>
            </Link>
        </li>
    </>);
};

function getFormattedDate(date: Date): string {
    const day = date.getUTCDay();
    const month = getMonthName(date.getUTCMonth());
    const year = date.getUTCFullYear()
    return `${day + 1} ${month} ${year}`;
}

function getMonthName(monthNumber: number): string {
    return select<number, string>(monthNumber, [
        [1, 'January'],
        [2, 'February'],
        [3, 'March'],
        [4, 'April'],
        [5, 'May'],
        [6, 'June'],
        [7, 'July'],
        [8, 'August'],
        [9, 'September'],
        [10, 'October'],
        [11, 'November'],
        [12, 'December'],
    ]);
}

export default NoteListItem;