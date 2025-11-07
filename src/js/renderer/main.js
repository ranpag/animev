import fetcher from "../fetcher.js"
import { animeCard } from "../components/card.js"
import { getAnime } from "../utils.js"

const renderPagination = (pagination, queryString, hideSaved) => {
	const $pagination = document.querySelector("#pagination")
	const $next = $pagination.querySelector("#next")
	const $prev = $pagination.querySelector("#prev")
	const $current = $pagination.querySelector("#current")

	$current.textContent = pagination.current_page
	$next.setAttribute("data-query", queryString)
	$prev.setAttribute("data-query", queryString)

	if (pagination.current_page === 1) $prev.setAttribute("disabled", true)
	else $prev.removeAttribute("disabled")
	if (!pagination.has_next_page) $next.setAttribute("disabled", true)
	else $next.removeAttribute("disabled")

	$pagination.style.display = "flex"

	$next.addEventListener("click", () => {
		fillAnimeContainer($next.getAttribute("data-query"), hideSaved, pagination.current_page + 1)
	})

	$prev.addEventListener("click", () => {
		fillAnimeContainer($prev.getAttribute("data-query"), hideSaved, pagination.current_page - 1)
	})
}

export const fillAnimeContainer = async (queryString, hideSaved = false, page = 1) => {
	const $animeContainer = document.querySelector("#animeCardContainer")
	const animeData = await fetcher.fetchAnimeSearch(page, queryString)
	const savedAnimes = getAnime(true)

	const $listCard = animeData.data
		.filter(data => !(hideSaved && savedAnimes.includes(data.mal_id)))
		.map(data => {
			if (savedAnimes.includes(data.mal_id)) data.saved = true
			return animeCard(data)
		})
		.join("")

	$animeContainer.innerHTML = $listCard
	renderPagination(animeData.pagination, queryString, hideSaved)
}
