import CategoryItem from "./CategoryItem";
import styles from './Categories.module.css';
import ActionItem from "./ActionItem";
import { useState } from "react";

type Link = {
    title: string;
    link: string;
};

type Action = {
    title: string;
    action: () => void;
};

type Props = {
    values: (Link | Action)[]
};

const Categories: React.FC<Props> = ({ values }: Props) => {
    const [menuOpened, setMenuOpened] = useState(false);

    const elements = values.map((categoryData, index) => {
        if ((categoryData as Action).action) {
            return <ActionItem
                key={index}
                action={(categoryData as Action).action}
                caption={categoryData.title}
            />
        } else if ((categoryData as Link).link) {
            return <CategoryItem
                key={index}
                link={(categoryData as Link).link}
                caption={categoryData.title}
            />
        }
    });


    let categoriesClasses = styles.categories;
    // if (!menuOpened) {
        categoriesClasses + 'hidden';
    // }

    return (<>
        <button onClick={toggleMenu}>menu</button>
        <ul className={categoriesClasses}>
            {elements}
        </ul>
    </>);
}

function toggleMenu(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

}

export default Categories;