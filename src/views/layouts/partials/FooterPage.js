const FooterPage = () => (
	<footer className='footer'>
		© {new Date().getFullYear()}
		<span className='mx-1 fw-bold'>SIS PICKING</span> Desarrollado por
		<a
			href='#'
			target='_blank'
			className='ms-1'
			rel='noreferrer'
		>
			TI - Megalabs
		</a>
	</footer>
);

export default FooterPage;