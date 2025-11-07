import { getAnime } from "../utils.js"

export const initListSavedAnime = () => {
	const $listContainer = document.querySelector("#listSavedAnime")
	const savedAnime = getAnime()

	const $li = savedAnime.map(a => `<li data-id="${a.id}">${a.title}</li>`).join("")
	$listContainer.innerHTML = $li
}

export const addListSavedAnime = (id, title) => {
	const $listContainer = document.querySelector("#listSavedAnime")
	const $li = document.createElement("li")
	$li.setAttribute("data-id", id)
	$li.textContent = title

	$listContainer.appendChild($li)
}

export const removeListSavedAnime = id => {
	const $listContainer = document.querySelector("#listSavedAnime")
	$listContainer.querySelector(`li[data-id="${id}"]`).remove()
}
