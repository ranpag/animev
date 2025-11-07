export const formatNumber = n =>
	n >= 1e9
		? (n / 1e9).toFixed(1).replace(/\.0$/, "") + "B"
		: n >= 1e6
		? (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
		: n >= 1e3
		? (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K"
		: n

export const saveAnime = (id, title = "") => {
	const animes = JSON.parse(localStorage.getItem("animes")) || []

	animes.push({ id, title })
	localStorage.setItem("animes", JSON.stringify(animes))
}

export const getAnime = idOnly => {
	if (!idOnly) return JSON.parse(localStorage.getItem("animes")) || []

	return (JSON.parse(localStorage.getItem("animes")) || []).map(i => i.id)
}

export const removeAnime = id => {
	const animes = JSON.parse(localStorage.getItem("animes")) || []

	localStorage.setItem("animes", JSON.stringify(animes.filter(i => i.id !== id)))
}
