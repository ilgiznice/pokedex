module.exports = (initialState) => (
  `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Pokedex</title>
      <link rel="stylesheet" href="/static/css/bootstrap.min.css">
      <link rel="stylesheet" href="/static/css/font-awesome.min.css">
      <link rel="stylesheet" href="/static/css/styles.css">
    </head>
    <body>
      <div id="app"></div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
      <script src="/static/js/bundle.js"></script>
    </body>
    </html>
  `
)