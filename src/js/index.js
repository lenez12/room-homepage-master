const heroImage = document.getElementById("section-hero");
const btnLeft = document.querySelector(
	".action-buttons--desktop .nav-button--left"
);
const btnRight = document.querySelector(
	".action-buttons--desktop .nav-button--right"
);
const btnLeftMob = document.querySelector(
	".action-buttons--mobile .nav-button--left"
);
const btnRightMob = document.querySelector(
	".action-buttons--mobile .nav-button--right"
);

const pageTitle = document.querySelector(".page-title");
const pageDesc = document.querySelector(".page-desc");
var data = [];
var count = 1;
var isMobile = false;

fetch("/data.json")
	.then((res) => res.json())
	.then((res) => {
		pageTitle.textContent = res[count - 1].title;
		pageDesc.textContent = res[count - 1].description;
		data = res;
	});

btnLeft.onclick = handleDecrement;
btnRight.onclick = handleIncrement;
btnLeftMob.onclick = handleDecrement;
btnRightMob.onclick = handleIncrement;

window.onresize = () => {
	let image;
	if (window.innerWidth <= 560) {
		isMobile = true;
		image = `url(${data[0].images.mobile})`;
		heroImage.style.backgroundImage = image;
	} else {
		image = `url(${data[0].images.desktop})`;
		isMobile = false;
		heroImage.style.backgroundImage = image;
	}
};

async function handleDecrement() {
	heroImage.classList.remove("slide-in");
	if (count == 1) count = 4;
	if (count > 1) count--;
	let image = "";
	if (isMobile) {
		image = `url(${data[count - 1].images.mobile})`;
	} else {
		image = `url(${data[count - 1].images.desktop})`;
	}
	heroImage.style.backgroundImage = image;
	pageTitle.textContent = data[count - 1].title;
	pageDesc.textContent = data[count - 1].description;
	heroImage.classList.add("slide-in");
	await sleep(3000);
	heroImage.classList.remove("slide-in");
}

async function handleIncrement() {
	heroImage.classList.remove("slide-in");
	if (count == 3) count = 0;
	if (count < 3) count++;
	let image = "";
	if (isMobile) {
		image = `url(${data[count - 1].images.mobile})`;
	} else {
		image = `url(${data[count - 1].images.desktop})`;
	}
	heroImage.style.backgroundImage = image;
	pageTitle.textContent = data[count - 1].title;
	pageDesc.textContent = data[count - 1].description;
	heroImage.classList.add("slide-in");
	await sleep(3000);
	heroImage.classList.remove("slide-in");
}

async function sleep(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, ms);
	});
}
