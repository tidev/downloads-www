export default function Footer() {
	return (
		<footer className='w-full'>
			<div className='max-w-screen-xl px-4 pt-12 pb-12 mx-auto overflow-hidden sm:px-6 lg:px-8'>
				<p className='my-2 text-sm text-center'>Want to help? <a
				href="https://tidev.io/donate" rel="noreferrer" target="_blank">Donate</a> or <a
				href="https://tidev.io/contribute" rel="noreferrer" target="_blank">Contribute</a></p>
				<p className='my-2 text-sm text-center'>© {new Date().getUTCFullYear()} <a href="https://tidev.io">TiDev, Inc.</a></p>
			</div>
		</footer>
	);
}
