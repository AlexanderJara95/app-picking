const fadeOutEffect = fadeTarget => {
	if (!fadeTarget) return;

	if (!fadeTarget.style.opacity) fadeTarget.style.opacity = 1;

	const fadeEffect = setInterval(() => {
		if (fadeTarget.style.opacity > 0) {
			fadeTarget.style.opacity -= 0.1;
		} else {
			fadeTarget.style.display = 'none';
			clearInterval(fadeEffect);
		}
	}, 100);
};

const fadeInEffect = fadeTarget => {
	if (!fadeTarget) return;

	if (!fadeTarget.style.opacity) fadeTarget.style.opacity = 0;

	let opacity = parseFloat(fadeTarget.style.opacity);
	fadeTarget.style.display = 'block';

	const fadeEffect = setInterval(() => {
		if (opacity < 0.9) {
			opacity += 0.1;
			fadeTarget.style.opacity = opacity;
		} else {
			clearInterval(fadeEffect);
		}
	}, 50);
};

const showPreloader = () => {
	const fadeTarget = document.querySelector('.preloader');
	fadeInEffect(fadeTarget);
};

const hidePreloader = () => {
	const fadeTarget = document.querySelector('.preloader');
	fadeOutEffect(fadeTarget);
};

export { showPreloader, hidePreloader };