import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from "next";
import Head from "next/head";
import { BuildTimeError } from "../../lib/errors";
import * as notesService from '../../lib/notes';
import * as assetService from '../../lib/assets';
import { NoteContent } from "../../lib/types";
import Link from "next/link";
import { NoteFormattedContent } from "../../components/Notes/NoteFormattedContent";
import { MainHeader } from "../../components/Header";
import { SingleColumnLayout } from "../../components/Layouts";
import { useRouter } from "next/router";
import NavigationBar, { ActionNavigationItem, LinkNavigationItem } from "../../components/Navigation/NavigationBar";

type Props = {
    note: NoteContent;
    noteKey: string[];
};

const Note: React.FC<Props> = ({ note }) => {
    const router = useRouter();

    return (<>
        <Head>
            <title>{note.title}</title>
            <link rel="icon" href="/images/favicon.ico" />
        </Head>
        <SingleColumnLayout>
            <NavigationBar items={[
                new LinkNavigationItem('Home', '/'),
                new ActionNavigationItem('Back', () => router.back())
            ]} />
            <NoteFormattedContent title={note.title} content={note.content} />
        </SingleColumnLayout>
    </>);
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await notesService.getAllNotesPaths();
    return {
        paths,
        fallback: false,
    }
};

type PageParams = {
    noteKey?: string[];
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext<PageParams>): Promise<GetStaticPropsResult<Props>> => {
    // TODO: try catch
    if (!params?.noteKey) throw new BuildTimeError("note ");
    const noteFileRelPath = assetService.getRelativeNoteFilePathFromLink(params.noteKey);
    const note = await notesService.getNoteContent(noteFileRelPath);

    return {
        props: {
            noteKey: params.noteKey,
            note,
        }
    };
};

export default Note;