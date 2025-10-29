import fs from 'fs';
import DownloadList from '../components/download-list';
import BranchList from '../components/branch-list';
import { BuildInfo } from '../lib/types';

export default function BuildsPage({ branch, branches, builds }) {
	return (
		<>
			<div className="px-5 py-2 mb-4 rounded-lg bg-opacity-10 bg-black">
				<p>Please note that CI Builds are <i>not</i> considered stable and should <i>not</i> be used in production.</p>
				<p>If you find any issues, please <a href="https://github.com/tidev/titanium-sdk/issues/new/choose" rel="noreferrer" target="_blank">create an issue</a>. Thanks!</p>
			</div>
			<section className="flex flex-row flex-wrap md:flex-nowrap gap-10">
				<BranchList branch={branch} branches={branches} />
				<DownloadList builds={builds} branch={branch} />
			</section>
		</>
	);
}

export async function getStaticPaths() {
	const branches = Object.keys(JSON.parse(fs.readFileSync('public/registry/branches.json', 'utf8')));
	const now = Date.now();
	const paths = branches.reduce((list, b: string) => {
		if (b !== 'main') {
			const builds = (JSON.parse(fs.readFileSync(`public/registry/${b}.json`, 'utf8')) as BuildInfo[])
				.filter(b => !b.expires || Date.parse(b.expires) > now);
			if (builds.length) {
				list.push(`/builds/${b}`);
			}
		}
		return list;
	}, ['/builds']);

	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps({ params }) {
	const now = Date.now();
	const branch = params.slug[1] || 'main';
	const branches = Object.keys(JSON.parse(fs.readFileSync('public/registry/branches.json', 'utf8')))
		.filter(branch => {
			const builds = (JSON.parse(fs.readFileSync(`public/registry/${branch}.json`, 'utf8')) as BuildInfo[])
				.filter(b => !b.expires || Date.parse(b.expires) > now);
			return builds.length > 0 || branch === 'main';
		});
	const builds = JSON.parse(fs.readFileSync(`public/registry/${branch}.json`, 'utf8'))
		.filter(b => !b.expires || Date.parse(b.expires) > now)
		.slice(0, 100);

	return {
		props: {
			branch,
			branches: branches.reduce((obj, b: string) => {
				obj[b] = b === 'main' ? '/builds' : `/builds/${b}`;
				return obj;
			}, {}),
			builds
		}
	};
}
