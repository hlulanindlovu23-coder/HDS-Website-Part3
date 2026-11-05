# Hlulani Digital Solutions Website

**Slogan:** Your Digital Future Starts Here.

## Project overview
A five-page responsive website for Hlulani Digital Solutions (HDS), a proposed Gauteng digital-services business offering web development, graphic design and basic IT support.

## Pages and features
- `index.html` – homepage and service overview
- `about.html` – business information
- `services.html` – service descriptions, live text search, category filtering and image gallery/lightbox
- `enquiry.html` – validated enquiry form that prepares an email
- `contact.html` – contact form and interactive embedded maps for Menlyn Mall and Quagga Centre

## Technologies
- HTML5 for semantic page structure and accessible forms
- CSS3 for page-specific styling and responsive layouts
- JavaScript (`script.js`) for mobile navigation, service filtering, gallery controls, URL-based service preselection and form validation/email preparation
- Google Maps embed/search links for map viewing and directions

## Project structure
- Five HTML pages listed above
- `index.css`, `about.css`, `services.css`, `enquiry.css`, `contact.css` – external stylesheets
- `script.js` – shared JavaScript interactions
- `images/` – illustrations and website mockup
- `robots.txt`, `sitemap.xml` – basic search-engine files
- `CHANGELOG.md` – development history
- `REFERENCES.md` – technical references

## Run locally
Open `index.html` in a browser or use the Live Server extension in Visual Studio Code. An internet connection is required for the embedded Google Maps.

## Form behaviour and important limitation
The enquiry and contact forms validate required fields in the browser and open the visitor's default email application with a pre-addressed, pre-filled message to **HlulaniNdlovu23@gmail.com**. The visitor must review and press Send in their email application. This is suitable for a static website demonstration, but it is not automatic server-side delivery and does not store submissions. Automatic form delivery/AJAX requires a configured backend or third-party form endpoint.

## Proposed service locations
- Menlyn Mall, Atterbury Road, Menlyn, Pretoria, Gauteng
- Quagga Centre, Quagga Road, Pretoria West, Gauteng

These are map reference/meeting points supplied for the project. They are not confirmation of registered HDS offices or a street address. Verify details before publishing.

## Changelog and references
See [CHANGELOG.md](CHANGELOG.md) and [REFERENCES.md](REFERENCES.md).
