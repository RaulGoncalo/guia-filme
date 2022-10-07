const key = "340759cf";

let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

const getMovie = async () => {
	try {
		let movieName = movieNameRef.value;
		let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

		if (!movieName) {
			result.innerHTML = `<h3 class = "msg">Por favor, digite um filme válido</h3>`;
		} else {
			const res = await fetch(url);
			const data = await res.json();

			if (data.Response == "True") {
				result.innerHTML = `
            <div class = "info">
                <img src = ${data.Poster} class="poster"/>
                <div>
                    <h2>
                        ${data.Title}
                    </h2>
                    <div class="rating">
                        <img src ="star-icon.svg"/>
                        <h4> ${data.imdbRating} </h4>
                    </div>
                    <div class="details">
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    </div>
                    <div class ="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                    </div>
                </div>
            </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
        `;
			} else {
				result.innerHTML = `<h3 class = "msg">${data.Error}</h3>`;
			}
		}
	} catch (error) {
		result.innerHTML = `<h3 class = "msg">Ocorreu um erro</h3>`;
	}
};

searchBtn.addEventListener("click", getMovie);

let todosFIlmes = `http://www.omdbapi.com/?apikey=${key}&type=movie`;
window.addEventListener("load", () => {
	fetch(todosFIlmes)
		.then((res) => res.json())
		.then((data) => console.log(data));
});
