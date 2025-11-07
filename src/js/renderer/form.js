import fetcher from "../fetcher.js"
import { fillAnimeContainer } from "./main.js"

const populateSelect = (selectId, options) => {
	const $select = document.querySelector(selectId)
	options.forEach(({ text, value, selected = false }) => {
		$select.add(new Option(text, value, false, selected))
	})
}

const populateCheckBox = (groupId, options) => {
	const $group = document.querySelector(groupId)
	const $checkboxGroup = $group.querySelector(".checkbox-group")

	options.forEach(({ mal_id, name }) => {
		const $labelContainer = document.createElement("label")
		$labelContainer.style = "display:flex;gap:4px;"

		const $checkboxInput = document.createElement("input")
		$checkboxInput.type = "checkbox"
		$checkboxInput.value = mal_id
		$checkboxInput.setAttribute("data-name", name)
		$checkboxInput.setAttribute("data-group", groupId)
		$checkboxInput.setAttribute("data-state", "none")
		$checkboxInput.style.display = "none"

		const $checkboxContainer = document.createElement("div")
		$checkboxContainer.className = "checkbox3-container"

		$labelContainer.append($checkboxInput, $checkboxContainer, name)
		$checkboxGroup.appendChild($labelContainer)
	})
}

const setupCheckbox3State = () => {
	const $modal = document.querySelector("#modal-genres")

	$modal.addEventListener("click", function (event) {
		const $checkboxContainer = event.target.closest(".checkbox3-container")
		if (!$checkboxContainer) return

		const $checkboxInput = $checkboxContainer.previousElementSibling
		let currentState = $checkboxInput.getAttribute("data-state")

		$checkboxContainer.innerHTML = ""

		if (currentState === "none") {
			$checkboxInput.setAttribute("data-state", "checked")
			$checkboxInput.checked = true
			$checkboxContainer.innerHTML = `✓`
			$checkboxContainer.className = "checkbox3-container checked"

			const $badgeContainer = document
				.querySelector(`${$checkboxInput.getAttribute("data-group")}-contain`)
				.querySelector(".badge-container")

			const $badge = document.createElement("div")
			$badge.className = "badge badge-yes"
			$badge.setAttribute("data-mal-id", $checkboxInput.value)
			$badge.textContent = $checkboxInput.getAttribute("data-name")

			$badgeContainer.appendChild($badge)
		}

		if (currentState === "checked") {
			$checkboxInput.setAttribute("data-state", "crossed")
			$checkboxInput.checked = false
			$checkboxContainer.innerHTML = `✗`
			$checkboxContainer.className = "checkbox3-container crossed"

			const $badgeContainer = document
				.querySelector(`${$checkboxInput.getAttribute("data-group")}-contain`)
				.querySelector(".badge-container")

			$badgeContainer.querySelector(`div[data-mal-id="${$checkboxInput.value}"]`).className = "badge badge-not"
		}

		if (currentState === "crossed") {
			$checkboxInput.setAttribute("data-state", "none")
			$checkboxInput.checked = false
			$checkboxContainer.innerHTML = ""
			$checkboxContainer.className = "checkbox3-container"

			const $badgeContainer = document
				.querySelector(`${$checkboxInput.getAttribute("data-group")}-contain`)
				.querySelector(".badge-container")

			$badgeContainer.querySelector(`div[data-mal-id="${$checkboxInput.value}"]`).remove()
		}
	})
}

const initModalAnimeGenres = async () => {
	const $form = document.querySelector("#sidebarFormSearch")
	const $modal = $form.querySelector("#modal-genres")
	const $btnOpen = $form.querySelector("#open-modal-genres")
	const $btnClose = $modal.querySelector("#close-modal-genres")
	const $btnClear = $modal.querySelector("#clear-chosed-genres")

	const { genres, explicit_genres, themes, demographics } = await fetcher.fetchAnimeGenre()

	populateCheckBox("#genres", genres)
	populateCheckBox("#explicit_genres", explicit_genres)
	populateCheckBox("#themes", themes)
	populateCheckBox("#demographics", demographics)

	setupCheckbox3State()

	$btnOpen.addEventListener("click", () => {
		$modal.style.display = "flex"
	})

	$btnClose.addEventListener("click", () => {
		$modal.style.display = "none"
	})

	$btnClear.addEventListener("click", () => {
		const $checkboxContainers = $modal.querySelectorAll(".checkbox3-container")
		$form.querySelectorAll(".badge").forEach(el => el.remove())

		$checkboxContainers.forEach(el => {
			const $checkboxInput = el.previousElementSibling

			$checkboxInput.setAttribute("data-state", "none")
			$checkboxInput.checked = false
			el.innerHTML = ""
			el.className = "checkbox3-container"
		})
	})

	$btnOpen.removeAttribute("disabled")
	$btnOpen.className = "btn"
}

const initFormAnimeSearch = () => {
	const $form = document.querySelector("#sidebarFormSearch")

	$form.addEventListener("submit", e => {
		e.preventDefault()
		const $hideSaved = $form.querySelector('input[name="hide_saved"]:checked')
		const formData = new FormData($form)

		;["anime_sort", "anime_status"].forEach(name => {
			const el = $form.querySelector(`input[name="${name}"]:checked`)
			if (el) formData.set(name, el.value)
		})

		formData.set("anime_sfw", $form.anime_sfw.checked)
		formData.set(
			"genres",
			[...document.querySelectorAll('[data-state="checked"]')].map(el => el.value)
		)
		formData.set(
			"genres_exclude",
			[...document.querySelectorAll('[data-state="crossed"]')].map(el => el.value)
		)

		const renameMap = {
			anime_search: "q",
			anime_type: "type",
			anime_order: "order_by",
			anime_rating: "rating",
			anime_sort: "sort",
			anime_status: "status",
			anime_min_score: "min_score",
			anime_max_score: "max_score",
			anime_start_date: "start_date",
			anime_end_date: "end_date",
			anime_sfw: "sfw",
			genres: "genres",
			genres_exclude: "genres_exclude",
		}

		for (const [oldKey, newKey] of Object.entries(renameMap)) {
			if (formData.has(oldKey)) {
				const value = formData.get(oldKey)
				formData.delete(oldKey)
				if (newKey === "sfw" && value === "true") formData.set(newKey, "")
				if (newKey !== "sfw" && value.length > 1) formData.set(newKey, value)
			}
		}

		formData.delete("hide_saved")
		const urlEncoded = new URLSearchParams(formData).toString()

		fillAnimeContainer(urlEncoded, Boolean($hideSaved))
	})
}

export default { populateSelect, initModalAnimeGenres, initFormAnimeSearch }
