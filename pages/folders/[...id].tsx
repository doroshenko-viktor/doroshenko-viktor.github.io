import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as folders from '../../lib/folders';
import * as categoriesService from '../../lib/categories';
import * as notesService from '../../lib/notes';
import { NoteDescription, CategoryDescription } from '../../lib/types';
import path from 'path';
import Head from 'next/head';
import NotesList from '../../components/Notes';
import Categories from '../../components/Categories';
import { MainSection } from '../../components/Parts/MainSection';
import { SectionCategories } from '../../components/Parts/SectionCategories';
import { Layout } from '../../components/Layouts/Layout';
import { MainHeader } from '../../components/Header';
import { MainPageLayout } from '../../components/Layouts';

type Props = {
    notes: NoteDescription[],
    categories: CategoryDescription[],
};

const Folders: React.FC<Props> = ({ notes, categories }: Props) => {
    const router = useRouter();

    return (<>
        <Head>
            <title>Tech Notes</title>
            <link rel="icon" href="/images/favicon.ico" />
        </Head>
        <MainPageLayout
            header={
                <Link href='/'>
                    <a>
                        <MainHeader title='Tech Notes' size='x' />
                    </a>
                </Link>
            }
            alt={
                <SectionCategories>
                    <Categories values={[{
                        title: "Return Back",
                        action: () => { router.back() },
                    }]} />
                    <Categories values={categories} />
                </SectionCategories>
            }
        >
            <NotesList values={notes} />
        </MainPageLayout>
    </>);
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await folders.getFolderAssetPaths();
    return {
        paths: paths,
        fallback: false,
    };
};

type PageParams = {
    id?: string[]
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext<PageParams>): Promise<GetStaticPropsResult<Props>> => {
    try {
        const { categories: categoriesFiles } = await folders
            .getFolderAssetsSeparated(params?.id || []);
        const categories = categoriesService.getCategoriesDescriptions(categoriesFiles);
        const pagePath = params?.id && path.join(...params.id) || '';

        const notes = await notesService.getFolderNotesDetails(pagePath);
        return {
            props: {
                notes,
                categories,
            }
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default Folders;
