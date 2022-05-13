# fogapo.ru

[![Current Deploy Status](https://api.netlify.com/api/v1/badges/prj_CPUg9my2RLOhxXSS7Dssz1rrEDPa/yMXYOKXUYC/deploy-status)](https://app.netlify.com/sites/fogapo.ru/deploys)

![](screenshot.jpg)

1. To view a static site **[click here](https://fogapo.ru/)**.
2. To view a site's code **[visit repository](https://github.com/Starck43/fogapo.git)**.
3. To add/change content **[open Django](https://admin.fogapo.ru)**.


## Site code

Site was written on React/Next.js with Python/Django backend. Pages are pre-rendered at build time

 - `next-config.js` -  API settings
 - `core/constants.js` - to change additional personal data
 - `pages/*.js` - base pages
 - `components/*.js` - all component's folder
 - `public/` - folder for icons, logos and fonts
 - `babel.config.js` Babel settings

# babel.config.js configuration
```
module.exports = {
		"presets": [
				[
						"next/babel",
				]
		],
		"plugins": [
				[
						"babel-plugin-root-import"
				],
				[
						"styled-components",
						{
								"ssr": true
						}
				],
				[
						"macros"
				],
		]
}
```

### Online registration

For sending data on server it uses a fetch function with post method [Python API](https://admin.fogapo.ru/api/user/add).
After success data saving server sends email notifications to administrator and message author

As base font used Axo 2 font


## Server API

Based on Django framework with Python code
 - `backend` -  Django project
 - `backend/forum` -  API app

 For API used `djangorestframework` package
 All packages saved in `backend/requirements.txt` file

```bash

# Environment installation
$ python3 -m venv venv
# Install main project crm
$ django-admin startproject crm .
# Install api app
$ django-admin startapp api

$ source ./venv/bin/activate

$ python3 manage.py createsuperuser

$ pip install -r requirements.txt

$ python manage.py migrate
# run server
$ python manage.py runserver [localhost:8000]
````

**[all posts  ](https://admin.fogapo.ru/api/posts/)**
**[detail post](https://admin.fogapo.ru/api/posts/[slug]/)**
**[latest post](https://admin.fogapo.ru/api/post/latest/)**


## Frontend

Before working with the project you need to be installed Node.JS, Git and Yarn.
In terminal clone and run the project:

```bash
# Clone this repository to your project's folder
$ git clone https://github.com/Starck43/fogapo.git

# Go into the repository
$ cd fogapo

# Install dependencies
$ npm i (or yarn)

# Start development server
# npm run dev
$ yarn dev
```


## Deployment

When you are done with development you should commit changes and push them back to github.

#### Deploying to Github

```bash
$ git add ./
$ git commit -m "some changes added"
$ git push origin
```

If you want to view a compiled site on github.io, please, read [Deploying on Github Pages](https://create-react-app.dev/docs/deployment/#github-pages) docs for React.

#### Deploying to Netlify

Site deploys and builds automatically and hosted directly with [Netlify](https://app.netlify.com) by linking a repository on Github.

[![Deploy To Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/starck43/fogapo)

For more information, read [hosting on Netlify](https://create-react-app.dev/docs/deployment/#netlify).

## Technologies Used

- [React](https://reactjs.org/)
- [NextJS](https://nextjs.org/)
- [Bootstrap React](https://react-bootstrap.github.io/)
- [Django](https://docs.djangoproject.com/)
- [Netlify](https://www.netlify.com/)

## Favicon Package

Generate favicons with [RealFaviconGenerator](https://realfavicongenerator.net/)

To install this package:

If the site is <code>http://www.example.com</code>, you should be able to access a file named <code>http://www.example.com/favicon.ico</code>.
Put the `favicon.ico` file to your root directory `public_html`

Insert the following code in the `head` section of `base.html`:

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#160d32">
    <meta name="msapplication-TileColor" content="#160d32">
    <meta name="msapplication-TileImage" content="/mstile-144x144.png">
    <meta name="theme-color" content="#ffffff">

*Optional* - Check your favicon with the [favicon checker](https://realfavicongenerator.net/favicon_checker)
