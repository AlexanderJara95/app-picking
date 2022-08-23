const elmBody = document.querySelector('body');

// =====================Methods
const fadeOutEffect = fadeTarget => {
	if (!fadeTarget) return;

	const fadeEffect = setInterval(() => {
		if (!fadeTarget.style.opacity) {
			fadeTarget.style.opacity = 1;
		}
		if (fadeTarget.style.opacity > 0) {
			fadeTarget.style.opacity -= 0.1;
		} else {
			fadeTarget.style.display = 'none';
			clearInterval(fadeEffect);
		}
	}, 100);
};

window.addEventListener('load', evt => {
	const fadeTarget = document.querySelector('.preloader');
	fadeOutEffect(fadeTarget);
});