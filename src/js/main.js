import animeData from "./data.js"
import form from "./renderer/form.js"
import { fillAnimeContainer } from "./renderer/main.js"
import { saveAnime, removeAnime } from "./utils.js"
import { initListSavedAnime, addListSavedAnime, removeListSavedAnime } from "./renderer/list.js"

// Initialization
document.addEventListener("DOMContentLoaded", async () => {
	if (document.querySelector("#sidebarFormSearch")) {
		form.populateSelect("#anime_type", animeData.animeTypes)
		form.populateSelect("#anime_order", animeData.animeOrders)
		form.populateSelect("#anime_rating", animeData.animeRatings)
	}

	form.initModalAnimeGenres()
	form.initFormAnimeSearch()

	setTimeout(() => {
		fillAnimeContainer("")
	}, 1500)

	document.querySelector("#animeCardContainer").addEventListener("click", event => {
		const $btnSave = event.target.closest(".save")
		if (!$btnSave) return

		const id = Number($btnSave.getAttribute("data-id"))
		const title = $btnSave.parentElement.querySelector("h3").title
		if ($btnSave.classList.contains("saved")) {
			removeAnime(id)
			removeListSavedAnime(id)
		} else {
			saveAnime(id, title)
			addListSavedAnime(id, title)
		}

		$btnSave.classList.toggle("saved")
	})

	initListSavedAnime()
})
