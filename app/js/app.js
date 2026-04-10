document.addEventListener('DOMContentLoaded', () => {

	const menuBtn = document.querySelector('.header__mobile');
	const headerMenu = document.querySelector('.header__menu-wrapper');
	const body = document.querySelector('body');

	menuBtn.addEventListener('click', () => {
		menuBtn.classList.toggle('active');
		headerMenu.classList.toggle('active');
		body.classList.toggle('no-scroll');
	})

	window.addEventListener('resize', () => {
		if (window.innerWidth > 768) {
			menuBtn.classList.remove('active');
			headerMenu.classList.remove('active');
			body.classList.remove('no-scroll');
		}
	})

	var swiperServices = new Swiper(".services__swiper", {
		loop: false,
		navigation: {
			nextEl: '.services__swiper-arrows-next',
			prevEl: '.services__swiper-arrows-prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 12
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 12
			},
			1024: {
				slidesPerView: 2,
				spaceBetween: 32
			}
		}
	
	});


	function initShimmer() {
		if (!document.getElementById('product-bg')) return;

		var section = document.querySelector('.product');
		if (!section) { setTimeout(initShimmer, 300); return; }

		const canvas = document.getElementById('product-bg');

		var ctx = canvas.getContext('2d');
		var BG  = [8, 7, 14];

		var blobs = [
			{
				// LEFT blob — main big violet
				xRatio: 0.0,
				yRatio: 0.5,
				rRatio: 0.70,
				color: [115, 20, 245],
				alpha: 0.85,
				xOffset: 0,
				yOffset: 0,
				xSpeed: 0.004,
				ySpeed: 0.006,
				xRange: 0.18,
				yRange: 0.45,
				pulseSpeed: 0.006,
				pulseOffset: 0,
			},
			{
				// LEFT second smaller blob
				xRatio: -0.05,
				yRatio: 0.5,
				rRatio: 0.45,
				color: [140, 40, 255],
				alpha: 0.50,
				xOffset: 1.0,
				yOffset: 0.5,
				xSpeed: 0.005,
				ySpeed: 0.004,
				xRange: 0.14,
				yRange: 0.38,
				pulseSpeed: 0.008,
				pulseOffset: 1.2,
			},
			{
				// RIGHT blob — main big purple
				xRatio: 1.0,
				yRatio: 0.5,
				rRatio: 0.65,
				color: [105, 15, 230],
				alpha: 0.75,
				xOffset: Math.PI,
				yOffset: Math.PI,
				xSpeed: 0.004,
				ySpeed: 0.006,
				xRange: 0.16,
				yRange: 0.42,
				pulseSpeed: 0.007,
				pulseOffset: 2.0,
			},
			{
				// RIGHT second smaller blob
				xRatio: 1.05,
				yRatio: 0.5,
				rRatio: 0.40,
				color: [125, 30, 240],
				alpha: 0.40,
				xOffset: Math.PI + 0.8,
				yOffset: Math.PI + 0.4,
				xSpeed: 0.006,
				ySpeed: 0.004,
				xRange: 0.12,
				yRange: 0.35,
				pulseSpeed: 0.009,
				pulseOffset: 3.0,
			},
			{
				// TOP RIGHT — small accent blob
				xRatio: 0.90,
				yRatio: 0.08,
				rRatio: 0.30,
				color: [95, 10, 215],
				alpha: 0.35,
				xOffset: 0.5,
				yOffset: 1.5,
				xSpeed: 0.003,
				ySpeed: 0.007,
				xRange: 0.10,
				yRange: 0.22,
				pulseSpeed: 0.010,
				pulseOffset: 4.0,
			},
			{
				// BOTTOM LEFT — small accent blob
				xRatio: 0.08,
				yRatio: 0.90,
				rRatio: 0.28,
				color: [100, 15, 220],
				alpha: 0.30,
				xOffset: 2.0,
				yOffset: 3.0,
				xSpeed: 0.004,
				ySpeed: 0.005,
				xRange: 0.10,
				yRange: 0.18,
				pulseSpeed: 0.008,
				pulseOffset: 5.0,
			}
		];

		var t = 0;

		function resize() {
			canvas.width  = section.offsetWidth;
			canvas.height = section.offsetHeight;
		}

		window.addEventListener('resize', resize);
		resize();

		function drawBlob(b) {
			b.xOffset += b.xSpeed;
			b.yOffset += b.ySpeed;

			// Position moves in all directions using sin/cos	
			var cx = canvas.width  * b.xRatio + Math.sin(b.xOffset) * canvas.width  * b.xRange;
			var cy = canvas.height * b.yRatio + Math.cos(b.yOffset) * canvas.height * b.yRange;
			var r  = canvas.width  * b.rRatio;

			// Pulse brightness
			var pulse = b.alpha * (0.78 + 0.22 * Math.sin(t * b.pulseSpeed + b.pulseOffset));

			var c = b.color;

			ctx.globalCompositeOperation = 'screen';

			var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
			grad.addColorStop(0,    'rgba('+c[0]+','+c[1]+','+c[2]+','+pulse+')');
			grad.addColorStop(0.20, 'rgba('+c[0]+','+c[1]+','+c[2]+','+(pulse * 0.75)+')');
			grad.addColorStop(0.45, 'rgba('+c[0]+','+c[1]+','+c[2]+','+(pulse * 0.38)+')');
			grad.addColorStop(0.70, 'rgba('+c[0]+','+c[1]+','+c[2]+','+(pulse * 0.10)+')');
			grad.addColorStop(1,    'rgba('+c[0]+','+c[1]+','+c[2]+',0)');

			ctx.fillStyle = grad;
			ctx.beginPath();
			ctx.arc(cx, cy, r, 0, Math.PI * 2);
			ctx.fill();
		}

		function render() {
		t++;

		// Dark base
		ctx.globalCompositeOperation = 'source-over';
		ctx.fillStyle = 'rgb('+BG[0]+','+BG[1]+','+BG[2]+')';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Draw all blobs
		blobs.forEach(drawBlob);

		// ── Vignette ──
		ctx.globalCompositeOperation = 'source-over';

		// Top fade
		var tg = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.22);
		tg.addColorStop(0, 'rgba('+BG[0]+','+BG[1]+','+BG[2]+',0.97)');
		tg.addColorStop(1, 'rgba('+BG[0]+','+BG[1]+','+BG[2]+',0)');
		ctx.fillStyle = tg;
		ctx.fillRect(0, 0, canvas.width, canvas.height * 0.22);

		// Bottom fade
		var bg2 = ctx.createLinearGradient(0, canvas.height * 0.75, 0, canvas.height);
		bg2.addColorStop(0, 'rgba('+BG[0]+','+BG[1]+','+BG[2]+',0)');
		bg2.addColorStop(1, 'rgba('+BG[0]+','+BG[1]+','+BG[2]+',0.92)');
		ctx.fillStyle = bg2;
		ctx.fillRect(0, canvas.height * 0.75, canvas.width, canvas.height * 0.25);

		// Center radial vignette
		var vx = canvas.width  / 2;
		var vy = canvas.height / 2;
		var vr = Math.max(canvas.width, canvas.height) * 0.90;
		var vg = ctx.createRadialGradient(vx, vy, canvas.width * 0.05, vx, vy, vr);
		vg.addColorStop(0,    'rgba(0,0,0,0)');
		vg.addColorStop(0.40, 'rgba(0,0,0,0.02)');
		vg.addColorStop(0.68, 'rgba('+BG[0]+','+BG[1]+','+BG[2]+',0.22)');
		vg.addColorStop(1,    'rgba('+BG[0]+','+BG[1]+','+BG[2]+',0.88)');
		ctx.fillStyle = vg;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		requestAnimationFrame(render);
		}

		render();
	}

	initShimmer();

	let msnry = null;

	const mq = window.matchMedia("(min-width: 1025px)");

	function handleMasonry(e) {
		const grid = document.querySelector(".feedback__grid");

		if (!grid) return;

		if (e.matches) {
			msnry = new Masonry(grid, {
			itemSelector: ".feedback__grid-item",
			columnWidth: ".feedback__grid-item",
			percentPosition: true,
			gutter: 32,
			transitionDuration: 0
			});
		} else {
			if (msnry) {
			msnry.destroy();
			msnry = null;

			document.querySelectorAll(".feedback__grid-item").forEach(el => {
				el.style.position = "";
				el.style.top = "";
				el.style.left = "";
			});
			}
		}
	}

	mq.addEventListener("change", handleMasonry);

	handleMasonry(mq);
})
