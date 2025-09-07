TMDB search app on next

- language change/translation
- trend movies
- search movies
- movie details: - cast - similar - recomended - trailer
- filter by: - year - genre
- favorites in local storage

SLOTS:
https://api.themoviedb.org/3/movie/{movie_id}/images
...[movie_id]/images
...[movie_id]/credits
...[movie_id]/recommendations
...[movie_id]/similar

DISOVER
https://api.themoviedb.org/3/discover/movie

- sorting (add type)
  &sort_by=popularity.desc
- genre
  &with_genres=35,36
- year
  &release_date.gte=2020-01-01&release_date.lte=2020-12-31

GENRES
https://api.themoviedb.org/3/genre/movie/list

v 0.02/250907

- favorites in local storage
- language
- cast as slot in movie_id
- layouts

================================================
v 0.01/250903

- migration from react
- metadata added

================================================
