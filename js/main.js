var app = app || {};

app.Bg = {
	getRandomArbitrary: function (min, max) {
		return parseInt(Math.random() * (max - min) + min);
	},

	changeBg: function () {
		var bg = this.getRandomArbitrary(0, 3),
				elems = document.getElementsByClassName('js-bg');

		for (var i = 0; i < elems.length; i++) {
			elems[i].style.backgroundImage = 'url("images/bg-' + bg + '.jpg")';
		}
	},

	init: function () {
		this.changeBg();
	}
};

app.Motion = {
	normalizeMotion: function (pos) {
		var fullW = window.innerWidth,
				windowCenter = fullW / 2,
				limiter = 100;
		return (pos - windowCenter) / limiter;
	},

	processMotion: function (depth) {
		function applyStyles() {
			var invertedDepth = depth - (depth * 2);
			document.getElementById("js-card").style.transform = 'perspective(1200px) rotateY('+ depth + 'deg)';
			document.getElementById("js-overlay").style.backgroundPosition = depth + '% 50%';
			document.getElementById("js-photo").style.transform = 'translateX(' + invertedDepth / 8 + 'px)';
		}
		window.requestAnimationFrame(applyStyles);
	},

	listenMotion: function () {
		window.addEventListener('mousemove', function(event) {
			var pos = app.Motion.normalizeMotion(event.pageX);
			app.Motion.processMotion(pos);
		});

		if (window.DeviceOrientationEvent) {
			window.addEventListener("deviceorientation", function (event) {
				if (window.innerHeight > window.innerWidth) {
					app.Motion.processMotion(event.gamma / 2);
				} else {
					app.Motion.processMotion(event.beta / 2);
				}
			}, true);
		}
	},

	init: function () {
		this.listenMotion();
	}
};

app.Bg.init();
app.Motion.init();
