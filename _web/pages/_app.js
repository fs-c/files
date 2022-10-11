import { Head } from '@fsoc/dhow';

const Footer = () => (<>
    <footer className={'flex flex-row justify-between prose dark:prose-invert container text-md py-3 mb-1 border-t border-gray-300 dark:border-gray-600 mt-4'}>
        <p className={'m-0'}>
            Built with <a href={'https://github.com/fs-c/dhow/tree/rewrite'}>fs-c/dhow</a>.
        </p>

        <a href={'/legal'}>imprint & privacy</a>
    </footer>
</>);

const App = ({ Component, pageProps = {} }) => (<>
    <Head>
        <title>{pageProps.title || 'fsoc.space'}</title>
    </Head>

    <div className={'min-h-screen flex flex-col h-full ' + (pageProps.wrapperClassName || '')}>
        <Component {...pageProps} />
    </div>

    <Footer />
</>);

export default App;