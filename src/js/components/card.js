import { formatNumber } from "../utils.js"

export const animeCard = data => {
	const genresBadge = [
		...data.genres.map(g => `<span class="badge">${g.name}</span>`),
		...data.themes.map(t => `<span class="badge">${t.name}</span>`),
		...data.explicit_genres.map(eg => `<span class="badge badge-not">${eg.name}</span>`),
		...data.demographics.map(d => `<span class="badge badge-yes">${d.name}</span>`),
	].join("")

	return /*html*/ `
        <fieldset class="card-fieldset" style="padding: 8px">
            <legend><span>☆ ${data.score}</span> | <span>☺ ${formatNumber(data.members)}</span></legend>
            <header>
                <hgroup>
                    <h3 title="${data.title}">${data.title}</h3>
                    <h5 title="${data.title_english || ""}">${data.title_english || "-"}</h5>
                </hgroup>
                <button class="btn save ${data.saved ? "saved" : ""}" data-id="${data.mal_id}" type="button">🏷</button>
            </header>
            <article>
                <figure>
                    <img
                        src="${data.images.webp.image_url}"
                        alt="${data.title} Poster Image"
                        loading="lazy"
                    />
                    <figcaption>${data.title} Poster Image</figcaption>
                </figure>
                <div class="info">
                    <p>${data.synopsis}</p>
                    <table>
                        <tbody>
                            <tr>
                                <td>Type</td>
                                <td>: ${data.type}</td>
                            </tr>
                            <tr>
                                <td>Episodes</td>
                                <td>: ${data.episodes} (${data.duration.replace(" per ", "/")})</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>: ${data.status}</td>
                            </tr>
                            <tr>
                                <td>Season</td>
                                <td>: <time>${data.year}/${data.season}</time></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>
            <footer class="badge-container">${genresBadge}</footer>
        </fieldset>
    `
}
