import { useEffect } from 'react';

const useHeaderHeight = () => {
	useEffect(() => {
		const setHeaderHeight = (): void => {
			const header: HTMLElement | null =
				document.querySelector('.header');

			if (!header) return;
			const headerHeight = header.offsetHeight;

			document.documentElement.style.setProperty(
				'--header-h',
				`${headerHeight}px`
			);
		};

		const setFooterHeight = (): void => {
			const footer: HTMLElement | null =
				document.querySelector('.footer');

			if (!footer) return;
			const footerHeight = footer.offsetHeight;

			document.documentElement.style.setProperty(
				'--footer-h',
				`${footerHeight}px`
			);
		};

		setHeaderHeight();
		setFooterHeight();

		window.addEventListener('resize', setHeaderHeight);

		return () => {
			window.removeEventListener('resize', setHeaderHeight);
		};
	}, []);
};

export default useHeaderHeight;
