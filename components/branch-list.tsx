import Link from 'next/link';
import type { BranchInfo } from '../lib/types';

export default function BranchList({
	branch: current,
	branches,
	className
}: {
	branch: string,
	branches: BranchInfo,
	className?: string
}) {
	return (
		<nav className={className}>
			<p className="font-medium uppercase">Branches</p>
			<ul className="branch-list">
				{Object.entries(branches).map(([ branch, url ], i) => {
					return (
						<li className={current === branch ? 'branch-current' : ''} key={`branch_${i}`}>
							{current === branch ? <span>{branch}</span> : <Link href={url as string}>{branch}</Link>}
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
