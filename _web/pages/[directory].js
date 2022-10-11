import util from 'util';
import path from 'path';
import fse from 'fs-extra';
import byteSize from 'byte-size';
import { formatISO } from 'date-fns';

const Directory = ({ entries }) => (<>
    <main className={'container'}>
        <p className={'mt-6 prose dark:prose-invert text-lg'}>
            Index of <a href={'https://github.com/fs-c/files'}>fs-c/files</a>, hosted here for better links.
        </p>

        <ul className={'text-gray-700 dark:text-gray-300 mt-4 flex flex-col gap-2'}>
            {process.env.__DHOW_ROUTE_PATH !== `//` ? (
                <li>
                    <a href={path.normalize(process.env.__DHOW_ROUTE_PATH + '/..')}>
                        <i>up</i>
                    </a>
                </li>
            ) : (<></>)}

            {entries.map((entry) => (<>
                <li className={'flex flex-row'}>
                    <a href={entry.href} className={'whitespace-nowrap overflow-ellipsis overflow-hidden flex-grow'}>
                        {entry.name}{entry.isDirectory ? '/' : ''}
                    </a>

                    {entry.isDirectory ? (<></>) : (<>
                        <p className={'text-gray-500 text-sm whitespace-nowrap'}>
                            <span className={'mr-2 hidden sm:inline-block'}>
                                {byteSize(entry.size)}
                            </span>

                            <time datetime={entry.lastModification}>
                                {entry.lastModification}
                            </time>
                        </p>
                    </>)}
                </li>
            </>))}
        </ul>
    </main>
</>);

export default Directory;

const contentFolder =
    process.env.NODE_ENV === 'production' ? 'files' : 'testing-files'
const contentPath = path.resolve('public', contentFolder);

export const getProps = async (relativePath) => {
    const directory = path.join(contentPath, relativePath);
    const content = await fse.readdir(directory, { withFileTypes: true });

    const entries = [];

    for (const entry of content) {
        const stat = await fse.stat(path.join(directory, entry.name));

        const isDirectory = entry.isDirectory();
        const href = path.join(
            '/', isDirectory ? '' : contentFolder, relativePath,
            entry.name
        );

        entries.push({
            name: entry.name,
            size: stat.size,
            lastModification: formatISO(stat.mtimeMs, { representation: 'date' }),

            href,
            isDirectory,
        });
    }

    // const treeHash = await exec('git rev-parse HEAD')

    return {
        entries: entries.sort((a, b) => (
            // Not sure if boolean arithmetic like this is a good idea
            b.isDirectory - a.isDirectory || a.name.localeCompare(b.name)
        )),
    };
};

export const getPaths = async () => {
    const getDirectories = async (directory) => {
        const content = await fse.readdir(directory, { withFileTypes: true });

        const directories = []

        for (const entry of content) {
            if (!entry.isDirectory()) {
                continue;
            }

            const entryPath = path.resolve(directory, entry.name);

            directories.push(
                entryPath.slice(contentPath.length),
                ...(await getDirectories(entryPath))
            );
        }

        return directories;
    };

    console.log(await getDirectories(contentPath));

    return [ '/', ...(await getDirectories(contentPath)) ];
};