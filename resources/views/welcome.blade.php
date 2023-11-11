<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    {{-- link to mapbox JS CSS --}}
    <link
        href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css"
        rel="stylesheet"
    />
    <title>Skisafe</title>
</head>
<body>
    <div id="root"></div>

    @viteReactRefresh
    @vite('resources/js/Skisafe.jsx')
</body>
</html>