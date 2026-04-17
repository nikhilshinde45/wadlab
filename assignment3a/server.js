const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const PORT = 1800;

const mimeType = {
  ".ico": "image/x-icon",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".eot": "application/vnd.ms-fontobject",
  ".ttf": "application/font-sfnt",
};

// Map file extensions to Bootstrap Icons and colors
function getFileIcon(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".html")
    return { icon: "bi-file-earmark-code", color: "#f06595" };
  if (ext === ".js") return { icon: "bi-file-earmark-code", color: "#f7df1e" };
  if (ext === ".css") return { icon: "bi-file-earmark-post", color: "#2965f1" };
  if (ext === ".png" || ext === ".jpg" || ext === ".svg")
    return { icon: "bi-file-earmark-image", color: "#6f42c1" };
  if (ext === ".pdf") return { icon: "bi-file-earmark-pdf", color: "#e3342f" };
  if (ext === ".mp3" || ext === ".wav")
    return { icon: "bi-file-earmark-music", color: "#ff5722" };
  if (ext === ".doc") return { icon: "bi-file-earmark-word", color: "#0d6efd" };
  return { icon: "bi-file-earmark", color: "#6c757d" };
}

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const sanitizePath = path
      .normalize(parsedUrl.pathname)
      .replace(/^(\.\.[\/\\])+/, "");
    let pathname = path.join(__dirname, sanitizePath);

    // Serve homepage with file explorer
    if (parsedUrl.pathname === "/") {
      const filesList = fs
        .readdirSync("./")
        .filter((f) => fs.statSync(f).isFile());

      let fileCards = filesList
        .map((file) => {
          const { icon, color } = getFileIcon(file);
          return `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4 file-card">
                <div class="card shadow-sm h-100 text-center p-3" style="border-top: 5px solid ${color};">
                    <i class="bi ${icon} display-4 mb-2" style="color: ${color};"></i>
                    <a href="./${file}" class="stretched-link text-dark fw-bold text-truncate d-block">${file}</a>
                </div>
            </div>`;
        })
        .join("");

      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Static File Explorer</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
            <style>
                body { 
                    background: linear-gradient(to right, #6a11cb, #2575fc);
                    min-height: 100vh; 
                    color: #fff;
                }
                .card:hover { 
                    transform: translateY(-5px); 
                    transition: 0.2s; 
                    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
                }
                .search-input { 
                    max-width: 400px; 
                    margin: 0 auto 30px auto; 
                }
                a { color: inherit; text-decoration: none; }
                .nav-buttons { text-align: center; margin-bottom: 30px; }
                .nav-buttons a { margin: 0 10px; }
            </style>
        </head>
        <body>
            <div class="container py-5">
                <h1 class="text-center mb-4">Files in Current Directory</h1>

                <!-- Navigation Buttons -->
                <div class="nav-buttons">
                    <a href="about.html" class="btn btn-light">About</a>
                    <a href="contact.html" class="btn btn-light">Contact</a>
                </div>

                <!-- Search Input -->
                <input type="text" class="form-control search-input mb-4" id="search" placeholder="Search files...">

                <!-- File Cards -->
                <div class="row" id="fileContainer">
                    ${fileCards}
                </div>
            </div>

            <script>
                const searchInput = document.getElementById('search');
                const fileCards = document.querySelectorAll('.file-card');

                searchInput.addEventListener('input', () => {
                    const query = searchInput.value.toLowerCase();
                    fileCards.forEach(card => {
                        const fileName = card.querySelector('a').textContent.toLowerCase();
                        card.style.display = fileName.includes(query) ? 'block' : 'none';
                    });
                });
            </script>
        </body>
        </html>
        `;

      res.setHeader("Content-Type", "text/html");
      res.end(html);
      return;
    }

    // Serve requested file
    if (!fs.existsSync(pathname)) {
      res.statusCode = 404;
      res.end(`<h1>404 Not Found</h1><p>File ${pathname} not found!</p>`);
    } else {
      fs.readFile(pathname, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Error reading the file.");
        } else {
          const ext = path.parse(pathname).ext;
          res.setHeader("Content-Type", mimeType[ext] || "text/plain");
          res.end(data);
        }
      });
    }
  })
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
