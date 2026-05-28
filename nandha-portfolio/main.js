const root = document.documentElement;
const cursorGlow = document.querySelector('.cursor-glow');
const modeChips = document.querySelectorAll('.mode-chip');
const modeTitle = document.querySelector('#modeTitle');
const modeText = document.querySelector('#modeText');
const pulseToggle = document.querySelector('#pulseToggle');
const statNumbers = document.querySelectorAll('[data-count]');
const revealItems = document.querySelectorAll('.reveal');
const tiltCards = document.querySelectorAll('.tilt-card');
const skillPills = document.querySelectorAll('.skill-pill');
const signalCanvas = document.querySelector('#signalCanvas');

const modeMap = {
	student: {
		title: 'Student Lens',
		text: 'Learning the fundamentals by shipping compact full-stack projects that sharpen both frontend and backend thinking.',
	},
	builder: {
		title: 'Builder Mode',
		text: 'Focused on structure, components, APIs, and turning ideas into apps that feel more complete every time.',
	},
	explorer: {
		title: 'Curious Mode',
		text: 'Always testing, trying, and improving. Every project is a chance to understand the stack more deeply.',
	},
};

let motionEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let statsAnimated = false;

const setTheme = (mode) => {
	const details = modeMap[mode];
	if (!details) {
		return;
	}

	if (mode === 'student') {
		root.removeAttribute('data-theme');
	} else {
		root.dataset.theme = mode;
	}
	modeTitle.textContent = details.title;
	modeText.textContent = details.text;

	modeChips.forEach((chip) => {
		const active = chip.dataset.mode === mode;
		chip.dataset.active = String(active);
		chip.setAttribute('aria-pressed', String(active));
	});
};

modeChips.forEach((chip) => {
	chip.addEventListener('click', () => setTheme(chip.dataset.mode));
});

const animateStat = (element) => {
	const target = Number(element.dataset.count);
	const duration = 1400;
	const startTime = performance.now();

	const tick = (currentTime) => {
		const progress = Math.min((currentTime - startTime) / duration, 1);
		const eased = 1 - Math.pow(1 - progress, 3);
		element.textContent = String(Math.round(target * eased));

		if (progress < 1) {
			requestAnimationFrame(tick);
		}
	};

	requestAnimationFrame(tick);
};

const revealObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) {
				return;
			}

			entry.target.dataset.visible = 'true';

			if (!statsAnimated && entry.target.querySelector('[data-count]')) {
				statNumbers.forEach(animateStat);
				statsAnimated = true;
			}

			revealObserver.unobserve(entry.target);
		});
	},
	{
		threshold: 0.18,
	}
);

revealItems.forEach((item) => revealObserver.observe(item));

document.addEventListener('pointermove', (event) => {
	if (cursorGlow && motionEnabled) {
		cursorGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
	}
});

tiltCards.forEach((card) => {
	card.addEventListener('pointermove', (event) => {
		if (!motionEnabled) {
			return;
		}

		const rect = card.getBoundingClientRect();
		const offsetX = event.clientX - rect.left;
		const offsetY = event.clientY - rect.top;
		const rotateY = ((offsetX / rect.width) - 0.5) * 10;
		const rotateX = ((offsetY / rect.height) - 0.5) * -10;

		card.style.setProperty('--rotate-x', `${rotateX.toFixed(2)}deg`);
		card.style.setProperty('--rotate-y', `${rotateY.toFixed(2)}deg`);
		card.style.setProperty('--lift-y', '-4px');
	});

	card.addEventListener('pointerleave', () => {
		card.style.setProperty('--rotate-x', '0deg');
		card.style.setProperty('--rotate-y', '0deg');
		card.style.setProperty('--lift-y', '0px');
	});
});

skillPills.forEach((pill) => {
	pill.addEventListener('pointermove', (event) => {
		if (!motionEnabled) {
			return;
		}

		const rect = pill.getBoundingClientRect();
		const moveX = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
		const moveY = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
		pill.style.transform = `translate(${moveX}px, ${moveY}px)`;
	});

	pill.addEventListener('pointerleave', () => {
		pill.style.transform = 'translate(0, 0)';
	});
});

pulseToggle.addEventListener('click', () => {
	motionEnabled = !motionEnabled;
	document.body.classList.toggle('motion-paused', !motionEnabled);
	pulseToggle.textContent = motionEnabled ? 'Pause motion' : 'Resume motion';

	if (!motionEnabled) {
		tiltCards.forEach((card) => {
			card.style.setProperty('--rotate-x', '0deg');
			card.style.setProperty('--rotate-y', '0deg');
			card.style.setProperty('--lift-y', '0px');
		});

		skillPills.forEach((pill) => {
			pill.style.transform = 'translate(0, 0)';
		});
	}
});

if (signalCanvas) {
	const context = signalCanvas.getContext('2d');
	const points = [];
	let animationFrame = 0;
	let width = 0;
	let height = 0;
	const pointer = {
		x: 0,
		y: 0,
		active: false,
	};

	const resizeCanvas = () => {
		const rect = signalCanvas.getBoundingClientRect();
		const dpr = window.devicePixelRatio || 1;
		width = rect.width;
		height = rect.height;
		signalCanvas.width = width * dpr;
		signalCanvas.height = height * dpr;
		context.setTransform(dpr, 0, 0, dpr, 0, 0);
	};

	const resetPoints = () => {
		points.length = 0;

		for (let index = 0; index < 20; index += 1) {
			points.push({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * 0.5,
				vy: (Math.random() - 0.5) * 0.5,
			});
		}
	};

	const drawNetwork = () => {
		if (!motionEnabled) {
			animationFrame = requestAnimationFrame(drawNetwork);
			return;
		}

		const accent = getComputedStyle(root).getPropertyValue('--accent-rgb').trim();
		context.clearRect(0, 0, width, height);

		points.forEach((point) => {
			point.x += point.vx;
			point.y += point.vy;

			if (point.x <= 0 || point.x >= width) {
				point.vx *= -1;
			}

			if (point.y <= 0 || point.y >= height) {
				point.vy *= -1;
			}

			if (pointer.active) {
				const deltaX = pointer.x - point.x;
				const deltaY = pointer.y - point.y;
				const distance = Math.hypot(deltaX, deltaY);

				if (distance < 130) {
					point.x -= deltaX * 0.006;
					point.y -= deltaY * 0.006;
				}
			}
		});

		for (let first = 0; first < points.length; first += 1) {
			for (let second = first + 1; second < points.length; second += 1) {
				const pointA = points[first];
				const pointB = points[second];
				const distance = Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y);

				if (distance > 120) {
					continue;
				}

				context.strokeStyle = `rgba(${accent.replace(/\s+/g, ', ')}, ${1 - distance / 120})`;
				context.lineWidth = 1;
				context.beginPath();
				context.moveTo(pointA.x, pointA.y);
				context.lineTo(pointB.x, pointB.y);
				context.stroke();
			}
		}

		points.forEach((point) => {
			context.fillStyle = `rgba(${accent.replace(/\s+/g, ', ')}, 0.9)`;
			context.beginPath();
			context.arc(point.x, point.y, 2.1, 0, Math.PI * 2);
			context.fill();
		});

		animationFrame = requestAnimationFrame(drawNetwork);
	};

	signalCanvas.addEventListener('pointermove', (event) => {
		const rect = signalCanvas.getBoundingClientRect();
		pointer.x = event.clientX - rect.left;
		pointer.y = event.clientY - rect.top;
		pointer.active = true;
	});

	signalCanvas.addEventListener('pointerleave', () => {
		pointer.active = false;
	});

	window.addEventListener('resize', () => {
		resizeCanvas();
		resetPoints();
	});

	resizeCanvas();
	resetPoints();
	drawNetwork();

	window.addEventListener('beforeunload', () => {
		cancelAnimationFrame(animationFrame);
	});
}

setTheme('student');
