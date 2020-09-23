const express = require("express");
const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer =  require("react-dom/server");

const PORT = 60005;
const app = express();


// This does the server-side rendering on the '/' route, works because we are a single page app
app.use("^/$", (req, res, next) => {
	fs.readFile(path.resolve(process.cwd() + "/dist/index.html"), "utf-8", async (err, data) => {
		if (err) {
			console.error(err);
			return res.status(500).send("Could not render the app server-side");
		}
		const componentPath = `${process.cwd()}/${process.env.componentPath}.js`;

		const { default: App } = await import(/* webpackIgnore: true */ componentPath);
		if (!App) {
			console.log(err);
			return res.status(500).send(err);
		};

		const ssr = ReactDOMServer.renderToString(<App />);
		return res.send(
			data.replace(
				"<div id=\"root\"></div>",
				`<div id="root">${ssr}</div>`
			)
		);
	}
	);
});

// We need to be able to serve static files, e.g images, CSS
app.use(express.static(path.resolve(process.cwd(), "/dist/public")));

// This basically starts the app
app.listen(PORT, () => {
    console.log(`App launched on http://localhost:${PORT}`);
})