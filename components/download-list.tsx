/* eslint-disable @next/next/no-html-link-for-pages */
import prettyBytes from 'pretty-bytes';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import type { BuildInfo } from '../lib/types';

const os = {
	linux: 'Linux',
	osx: 'macOS',
	win32: 'Windows'
};

function InstallCmd({ cmd }: { cmd: string }) {
	const [ copied, setCopied ] = useState(false);

	useEffect(() => {
		if (copied) {
			const timer = setTimeout(() => {
				setCopied(false);
			}, 2000);
			return () => clearTimeout(timer);
		}
	});

	return (
		<div className="term">
			<div>
				<div className="term-line">
					<span className="term-prompt">&gt;</span>{cmd}<CopyToClipboard
						text={cmd} onCopy={() => setCopied(true)}>
						<span className={`clipboard ${copied ? 'copied' : ''}`} title="Copy to clipboard">
							<svg className="clipboard-icon" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
								<rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
							</svg>
						</span>
					</CopyToClipboard>
				</div>
			</div>
		</div>
	);
}

export default function DownloadList({
	branch = '',
	builds,
	className = ''
}: {
	branch?: string,
	builds: BuildInfo[],
	className?: string
}) {
	const latestGA = builds.find(build => build.name.endsWith('GA'))

	return (
		<div className={className}>
			{builds.map((build: BuildInfo, i: number) => {
				const cmd = `ti sdk install ${branch ? `--branch ${branch} ` : ''}${build.name}`;
				return (
					<div className="download" key={`build_${i}`}>
						{build.name === latestGA.name &&
  						<span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">Latest</span>							}
						<div className='flex'>
							<h4>
								{build.name}
							</h4>
						</div>
						<div className="flex flex-row flex-wrap xl:flex-nowrap gap-6 items-center">
							<InstallCmd cmd={cmd} />
							<ul className="download-details">
								{build.expires && <li><span>Expires</span>{new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(build.expires))}</li>}
								<li><span>Published</span><a href={build.url} rel="noreferrer" target="_blank">{new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(build.date))}</a></li>
								{build.assets.map((a, j) => (
									<li key={`asset_${i}_${j}`}><span>{os[a.os]}</span> <a href={a.url}>{prettyBytes(a.size)}</a></li>
								))}
							</ul>
						</div>
					</div>
				);
			})}
		</div>
    );
}
