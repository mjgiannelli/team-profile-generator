// this is where we will create functions to write the html template and pass in the responses from the prompts
// include a header
// container
// one row
// add a card anytime a new employee is added
// card contains a container
// 2 rows
// first row two columns (Name and icon)
// second row 3 columns (list)


//function to take the employee object array and create an HTML template with it
const generateEmployeeCards = employeesArray => {
  return `
    <section class='row'>
      
        ${employeesArray
      .filter(({ role }) => role === 'Manager')
      .map(({ name, role, id, email, officeNumber }) => {
        return `
        <div class='col'>
          <div class='card-container'>
            <div class='card-title-row'>
              <div class='card-col-title'>
                <h2>${name}</h2>
              </div>
              <div class='card-col-title'>
                <h3><i class="fas fa-mug-hot"></i> ${role}</h3>
              </div>
            </div>
            <div class='card-body-row'>
              <div class='card-col-body'>
                <h4>ID: ${id}</h4>
              </div>
              <div class='card-col-body link'>
                <a href='mailto:${email}'>Email: ${email}</a>
              </div>
              <div class='card-col-body'>
                <h4>Office Number: ${officeNumber}</h4>
              </div>
            </div>
          </div>
        </div>       
        `;
      })
      .join('')}

      ${employeesArray
      .filter(({ role }) => role === 'Engineer')
      .map(({ name, role, id, email, github }) => {
        return `
          <div class='col'>
            <div class='card-container'>
              <div class='card-title-row'>
                <div class='card-col-title'>
                  <h2>${name}</h2>
                </div>
                <div class='card-col-title'>
                  <h3><i class="fas fa-glasses"></i> ${role}</h3>
                </div>
              </div>
              <div class='card-body-row'>
                <div class='card-col-body'>
                  <h4>ID: ${id}</h4>
                </div>
                <div class='card-col-body link'>
                  <a href='mailto:${email}'>Email: ${email}</a>
                </div>
                <div class='card-col-body link'>
                <a href='https://github.com/${github}'>GitHub: ${github}</a>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join('')}

        ${employeesArray
      .filter(({ role }) => role === 'Intern')
      .map(({ name, role, id, email, school }) => {
        return `
          <div class='col'>
              <div class='card-container'>
                <div class='card-title-row'>
                  <div class='card-col-title'>
                    <h2>${name}</h2>
                  </div>
                  <div class='card-col-title'>
                    <h3><i class="fas fa-user-graduate"></i> ${role}</h3>
                  </div>
                </div>
                <div class='card-body-row'>
                  <div class='card-col-body'>
                    <h4>ID: ${id}</h4>
                  </div>
                  <div class='card-col-body link'>
                    <a href='mailto:${email}'>Email: ${email}</a>
                  </div>
                  <div class='card-col-body'>
                    <h4>School: ${school}</h4>
                  </div>
                </div>
              </div>
            </div>
          `;
      })
      .join('')}
    </section>
  `;
}


// function to create html template and combining the template generated from above
module.exports = templateData => {
  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Organization Chart</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
        integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
    <link rel="stylesheet" href="style.css">
  </head>


  <body>
    <header>
      <h1>My Team<h1>
    </header>
    <main class="container">
      ${generateEmployeeCards(templateData)}
    </main>
  </body>
  </html>
  `;
};
