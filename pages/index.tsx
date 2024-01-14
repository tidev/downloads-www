import fs from 'fs';
import { sortLatest, types } from '../lib/util';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';

export default function Home({ latest }) {
	const [ copiedNPM, setCopiedNPM ] = useState(false);
	const [ copiedInstall, setCopiedInstall ] = useState(false);

	const onCopy = (current, setter) => {
		current && clearTimeout(current);
		setter(setTimeout(() => setter(null), 2000));
	};

	return (
		<>
			<h2>Welcome!</h2>
			<section className="flex flex-row flex-wrap gap-10">
				<div className="flex-auto md:flex-1">
					<p>This site is the official <a href="https://titaniumsdk.com/" rel="noreferrer" target="_blank">Titanium
					SDK</a> downloads registry. Here you'll find General Availability (GA) releases, Release Candidates (RC),
					Beta releases, and Continuous Integration (CI) builds.</p>
					<p>The easiest way to install these SDKs is to use the <a
					href="https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Guide/Titanium_Command-Line_Interface_Reference/#sdk"
					rel="noreferrer" target="_blank">Titanium CLI</a>.
					You may install as many SDK versions as you'd like.</p>
				</div>
				<div className="flex-1 term w-full">
					<div>
						<div className="term-line"><span className="term-comment"># Step 1: Install the Titanium CLI</span></div>
						<div className="term-line">
							<span className="term-prompt">&gt;</span>npm i -g titanium<CopyToClipboard
								text='npm i -g titanium' onCopy={() => onCopy(copiedNPM, setCopiedNPM)}>
								<span className={`clipboard ${copiedNPM ? 'copied' : ''}`} title="Copy to clipboard">
									<svg className="clipboard-icon" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
										<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
										<rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
									</svg>
								</span>
							</CopyToClipboard>
						</div>
						<br/>
						<div className="term-line"><span className="term-comment"># Step 2: Install the latest Titanium SDK</span></div>
						<div className="term-line">
							<span className="term-prompt">&gt;</span>ti sdk install {latest.ga.name} --default<CopyToClipboard
								text={`ti sdk install ${latest.ga.name} --default`} onCopy={() => onCopy(copiedInstall, setCopiedInstall)}>
								<span className={`clipboard ${copiedInstall ? 'copied' : ''}`} title="Copy to clipboard">
									<svg className="clipboard-icon" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
										<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
										<rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
									</svg>
								</span>
							</CopyToClipboard>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export async function getStaticProps() {
	return {
		props: {
			latest: types.reduce((obj, type) => {
				const build = JSON.parse(
					fs.readFileSync(`public/registry/${type}.json`, 'utf8')
				).sort(sortLatest)[0];
				if (build) {
					obj[type] = build;
				}
				return obj;
			}, {})
		}
	};
}
