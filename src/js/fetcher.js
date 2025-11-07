const BASE_URL = "https://api.jikan.moe/v4"

const fetchWithRetry = async (url, retryDelay = 1500, maxRetries = 3) => {
	let attempt = 0

	while (attempt < maxRetries) {
		try {
			const res = await fetch(url)
			if (res.ok) return res

			if (res.status === 429) {
				await new Promise(r => setTimeout(r, retryDelay))
				attempt++
				continue
			}

			throw new Error(`HTTP Error ${res.status}`)
		} catch (err) {
			console.error(`Fetch error: ${err.message}`)
			if (attempt >= maxRetries - 1) throw err
			await new Promise(r => setTimeout(r, retryDelay))
			attempt++
		}
	}
}

const fetchSeasonList = async () => {
	try {
		const res = await fetch(`${BASE_URL}/seasons`)
		if (!res.ok) throw new Error(`HTTP ${res.status}`)

		return (await res.json()).data
	} catch (err) {
		console.error("Error when fetching season list:", err.message)
		throw err
	}
}

const fetchAnimeGenre = async () => {
	const animeGenres = {
		genres: `${BASE_URL}/genres/anime?filter=genres`,
		explicit_genres: `${BASE_URL}/genres/anime?filter=explicit_genres`,
		themes: `${BASE_URL}/genres/anime?filter=themes`,
	}

	try {
		const requests = Object.entries(animeGenres).map(async ([key, url]) => {
			const res = await fetch(url)
			if (!res.ok) throw new Error(`Failed to fetch ${key}`)
			const data = await res.json()
			return [key, data.data]
		})

		const results = await Promise.all(requests)
		const finalResult = Object.fromEntries(results)

		finalResult.demographics = [
			{
				mal_id: 43,
				name: "Josei",
				url: "https://myanimelist.net/anime/genre/43/Josei",
				count: 160,
			},
			{
				mal_id: 15,
				name: "Kids",
				url: "https://myanimelist.net/anime/genre/15/Kids",
				count: 6980,
			},
			{
				mal_id: 42,
				name: "Seinen",
				url: "https://myanimelist.net/anime/genre/42/Seinen",
				count: 1127,
			},
			{
				mal_id: 25,
				name: "Shoujo",
				url: "https://myanimelist.net/anime/genre/25/Shoujo",
				count: 519,
			},
			{
				mal_id: 27,
				name: "Shounen",
				url: "https://myanimelist.net/anime/genre/27/Shounen",
				count: 2163,
			},
		]

		return finalResult
	} catch (err) {
		console.error("Error when fetching anime genres:", err)
		return null
	}
}

const fetchAnimeSeason = async (page, year, season) => {
	if (!year) year = new Date().getFullYear()
	if (!season) {
		const month = new Date().getMonth()
		if (month < 3) season = "winter"
		else if (month < 6) season = "spring"
		else if (month < 9) season = "summer"
		else season = "fall"
	}

	try {
		const res = await fetch(`${BASE_URL}/seasons/${year}/${season}?limit=25&page=${page}`)
		if (!res.ok) throw new Error(`HTTP ${res.status}`)
		const json = await res.json()

		return {
			pagination: json.pagination,
			data: json.data,
		}
	} catch (err) {
		console.error(`Error when fetching anime ${year}/${season}:`, err.message)
		throw err
	}
}

const fetchAnimeSearch = async (page, queryString) => {
	try {
		const res = await fetchWithRetry(`${BASE_URL}/anime?limit=25&page=${page}&${queryString}`)
		if (!res.ok) throw new Error(`HTTP ${res.status}`)
		const json = await res.json()

		return {
			pagination: json.pagination,
			data: json.data,
		}
	} catch (err) {
		console.error(`Error when fetching anime:`, err.message)
		throw err
	}
}

export default { fetchSeasonList, fetchAnimeGenre, fetchAnimeSeason, fetchAnimeSearch }
