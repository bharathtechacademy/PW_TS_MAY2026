//Locators: Locators are nothing but the default methods provided by Playwright to identify the location of web elements. 

//There are mainly 9 different locator techniques we have within the Playwright to identify the location of a web element.

// 1.getByRole()
// 2.getByLabel
// 3.getByPlaceHolder()
// 4.getByText()
// 5.getByAltText()
// 6.getByTitle()
// 7.getByTestId();
// 8.xpath
// 9.css selector


// 1.getByRole() : Get by role method is all about locating the web element based on its role. 
Syntax : const element = page.getByRole('role' , {name : 'value'})

role -> button, textbox , checkbox, link, radio etc..
value -> text-value, aria-label , value , label 

const gmailLink = page.getByRole('link', {name : 'Gmail'})
const googleSearch = page.getByRole('textbox', {name : 'Search'})
const signInButton = page.getByRole('button', {name : 'Log In'})

// 2.getByLabel => This method is used to identify the location of a web element based on its label text. 
//Syntax : const element = page.getByLabel('label-text'); // works for the element having the tag as 'label'
const javascriptOption = page.getByLabel('JavaScript');

// 3.getByPlaceholder => This method is used to identify the location of a web element based on its placeholder attribute value. 
const firstName = page.getByPlaceholder('First Name');

// 4.getByText => Locating the element by using the text value of the element 
const header = page.getByText('Practice Form');

// 5.getByAltText => Locating the web element by using the alt text value of the element  (alt =parabank)
const logo = page.getByAltText('ParaBank');

//6. getByTitle => Locating the web element by using the title of the element 
const googleSearchTextbox = page.getByTitle('Search');

//7. getByTestId => Locate the web element based on the testId attribute value. (data-testid = "value")
const todoList = page.getByTestId('todo-count');

//8.css

//9.xpath
