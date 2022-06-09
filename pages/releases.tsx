import DownloadList from '../components/download-list';
import fs from 'fs';
import { sortLatest } from '../lib/util';
import type { BuildInfo } from '../lib/types';

export default function Releases({ builds }: { builds: BuildInfo[] }) {
	return (
		<section className="max-w-3xl flex flex-col justify-center mx-auto">
			<h2>Official Releases</h2>
			<DownloadList builds={builds} />
		</section>
	);
}

export async function getStaticProps() {
	return {
		props: {
			builds: [
				...JSON.parse(fs.readFileSync('public/registry/ga.json', 'utf8')),
				...JSON.parse(fs.readFileSync('public/registry/rc.json', 'utf8')),
				...JSON.parse(fs.readFileSync('public/registry/beta.json', 'utf8'))
			].sort(sortLatest)
		}
	};
}
