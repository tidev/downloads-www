import '../styles/site.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Head>
				<title>Official Titanium SDK Downloads</title>
				<meta name="description" content="Download official Titanium SDK GA, RC, Beta, and CI builds" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
