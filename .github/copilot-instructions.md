# Copilot Instructions for PWP Portafolio Project

## Project Overview
Educational web development portfolio organized as a progression of learning modules (numbered 01-16) covering frontend fundamentals to full-stack CRUD applications. Each folder represents a distinct learning phase with increasing complexity.

## Architecture Patterns

### Frontend Projects (01-13)
- **Vanilla HTML/CSS/JavaScript** with no frameworks
- Single-file or simple folder organization: HTML file + `/css` and `/js` subdirectories
- Global scope usage common in earlier exercises (functions executed on `window.onload`)
- Environment: Static files served directly in browser
- Examples: `04 Formulario/`, `05 Ejercicios/`, `11 APIFetch/`

### Backend CRUD Projects (14-16)
- **Node.js + Express** stack with MySQL database
- **MVC pattern**: Separates Controllers, Routers, Views, and Database layers
- Structure follows: `app.js` (entry) → `package.json` (dependencies) → organized subdirectories
- Port conventions: 6160 (14CRUDMYSQL), 3000 (10Postman)
- Dependencies: `express`, `mysql2`, `body-parser`, `ejs`, `cors`, `dotenv`

#### 14CRUDMYSQL (Monolithic)
- All routes in `app.js`; direct DB connection in main file
- Uses `.env` for database credentials
- EJS template engine in `/views` (index.ejs, editar.ejs)
- Single-file architecture pattern

#### 16CRUDSEPARADO (Modular - Recommended Pattern)
- **Controllers** (`/Controllers/cursosControl.js`): Business logic, DB queries
- **Routers** (`/routers/cursosRouters.js`): Route definitions, endpoint mappings
- **Database** (`/database/`): Centralized connection (currently empty in structure)
- Follows MVC separation; incomplete—database module not yet implemented
- Pattern to follow for new backend features

## Key Development Patterns

### Frontend JavaScript Conventions
1. **Event-driven**: Functions triggered by `window.onload` or element event listeners
2. **Form validation**: Using regex patterns for email, numbers, names (see `04 Formulario/validacion.js`)
   - Regex for Spanish characters: `/^[A-Za-zÑñÁÉÍÓÚáéíóú\s]{3,}$/`
   - Email pattern: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
   - Numbers only: `/^\d+$/`

3. **API Integration**: Fetch API with async/await (see `11 APIFetch/fetch.js` for PokeAPI example)
   - Structured DOM element caching in objects
   - Loader states and disabled buttons during requests
   - Error handling with fallback UI states

4. **DOM Manipulation**: Direct manipulation via `document.getElementById()`, `innerHTML`, `classList`

### Backend Express Patterns
1. **Database Queries**: Callback-based MySQL connection
   ```javascript
   dbConnection.query('SELECT * FROM cursos', (err, results) => {
       if (err) return res.status(400).json({ message: 'Error' });
       res.status(200).json(results);
   });
   ```

2. **Middleware setup** (from 14CRUDMYSQL):
   - `bodyParser.urlencoded({ extended: false })`
   - `express.json()`
   - Static file serving: `express.static(__dirname + '/css')`
   - EJS view engine config with `app.set('view engine', 'ejs')`

3. **Routing convention**: GET for display/fetch, POST for create, GET with ID for edit forms, POST for update
   - Update routes map to views: `app.get('/students/edit/:id')` → render edit form
   - Delete uses GET: `app.get('/students/delete/:id')` (non-REST but pattern used)

4. **Error handling**: SQL injection vulnerable (no parameterized queries); wrap in try-catch but improve with prepared statements when refactoring

5. **Environment variables**: Use `.env` with `dotenv` for DB credentials
   - Access via `process.env.DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`

## File Organization Checklist
- Frontend: Place CSS in `/css/`, JS in `/js/`, HTML at root
- Backend: Keep `app.js` at root, use subdirectories for Controllers/Routers/Views/Database
- Node projects: Always include `package.json`, `.env` template if needed
- Database: Complete the `/database/db.js` connection file in 16CRUDSEPARADO (currently missing)

## Common Commands
- **Run Node projects**: `node app.js` or `node index.js`
- **View project**: Open HTML directly in browser or via local server (use VS Code Live Server extension)
- **Test Express routes**: Use Postman (see 10Postman structure) or curl

## Security Notes
- Current code uses template literals in SQL (SQL injection risk): `SELECT * FROM table WHERE id = ${id}`
- Recommend migrating to prepared statements: `connection.query('SELECT * FROM table WHERE id = ?', [id], callback)`
- Sanitize user input before database operations

## Incomplete Patterns to Complete
1. **16CRUDSEPARADO**: `/database/db.js` needs implementation for database connection export
2. **General**: No test files found; projects are exercise-based without automated testing
3. **Error pages**: No custom 404/error handling in Express projects

## Language Notes
- Codebase uses **Spanish comments extensively**; maintain bilingual documentation
- Project names and directory structure follow Spanish conventions
