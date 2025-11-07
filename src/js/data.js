const animeTypes = [
    { value: "", text: "Type", selected: true },
    { value: "tv", text: "TV" },
    { value: "movie", text: "Movie" },
    { value: "ova", text: "OVA" },
    { value: "special", text: "Special" },
    { value: "ona", text: "ONA" },
    { value: "music", text: "Music" },
    { value: "cm", text: "CM" },
    { value: "pv", text: "PV" },
    { value: "tv_special", text: "TV Special" },
];

const animeOrders = [
    { value: "", text: "Order By", selected: true },
    { value: "mal_id", text: "MAL ID" },
    { value: "title", text: "Title" },
    { value: "start_date", text: "Start Date" },
    { value: "end_date", text: "End Date" },
    { value: "episodes", text: "Episodes" },
    { value: "score", text: "Score" },
    { value: "scored_by", text: "Scored By" },
    { value: "rank", text: "Rank" },
    { value: "popularity", text: "Popularity" },
    { value: "members", text: "Members" },
    { value: "favorites", text: "Favorites" },
];

const animeRatings = [
    { value: "", text: "Ratings", selected: true },
    { value: "g", text: "G - All Ages" },
    { value: "pg", text: "PG - Children" },
    { value: "pg13", text: "PG - 13 - Teens 13 or Older" },
    { value: "r17", text: "R - 17+ (Violence & Profanity)" },
    { value: "r", text: "R+ - Mild Nudity" },
    { value: "rx", text: "Rx - Hentai" },
];

export default { animeTypes, animeOrders, animeRatings };
