const form = document.getElementById("rectangle-form");
const panjangInput = document.getElementById("panjang");
const lebarInput = document.getElementById("lebar");
const luasOutput = document.getElementById("luas");
const kelilingOutput = document.getElementById("keliling");
const panjangVisual = document.getElementById("visual-panjang");
const lebarVisual = document.getElementById("visual-lebar");
const rectangleVisual = document.getElementById("rectangle-visual");
const formatAngka = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 4 });

function hitungPersegiPanjang(event) {
	event.preventDefault();

	const panjang = Number(panjangInput.value);
	const lebar = Number(lebarInput.value);

	if (!Number.isFinite(panjang) || !Number.isFinite(lebar) || panjang <= 0 || lebar <= 0) {
		form.reportValidity();
		return;
	}

	luasOutput.textContent = formatAngka.format(panjang * lebar);
	kelilingOutput.textContent = formatAngka.format(2 * (panjang + lebar));
	panjangVisual.textContent = formatAngka.format(panjang);
	lebarVisual.textContent = formatAngka.format(lebar);
	const rasio = Math.min(Math.max(panjang / lebar, 0.55), 2.2);
	rectangleVisual.style.aspectRatio = `${rasio} / 1`;
	rectangleVisual.setAttribute(
		"aria-label",
		`Persegi panjang, panjang ${formatAngka.format(panjang)} meter dan lebar ${formatAngka.format(lebar)} meter`
	);
}

form.addEventListener("submit", hitungPersegiPanjang);

const themeToggle = document.getElementById("theme-toggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const temaStorageKey = "hitungRuangTheme";

function simpanTema(tema) {
	try {
		localStorage.setItem(temaStorageKey, tema);
	} catch {
		return;
	}
}

function terapkanTema(tema, simpanPilihan = false) {
	document.documentElement.dataset.theme = tema;
	themeToggle.checked = tema === "dark";

	if (simpanPilihan) {
		simpanTema(tema);
	}
}

let temaTersimpan = null;

try {
	temaTersimpan = localStorage.getItem(temaStorageKey);
} catch {
	temaTersimpan = null;
}

let penggunaMemilihTema = Boolean(temaTersimpan);

terapkanTema(temaTersimpan || (systemTheme.matches ? "dark" : "light"));

themeToggle.addEventListener("change", () => {
	penggunaMemilihTema = true;
	terapkanTema(themeToggle.checked ? "dark" : "light", true);
});

systemTheme.addEventListener("change", (event) => {
	if (!penggunaMemilihTema) {
		terapkanTema(event.matches ? "dark" : "light");
	}
});
