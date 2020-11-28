# Feed Reader Testing

In this project , using [Jasmine](http://jasmine.github.io/) framework test cases are written for a web-based application that reads RSS feeds.


## Significance of Test Driven Development

Testing is an important part of the development process and many organizations practice a standard of development known as "test-driven development". This is when developers write tests first, before they ever start developing their application. All the tests initially fail and then they start writing application code to make these tests pass.

Whether you work in an organization that uses test-driven development or in an organization that uses tests to make sure future feature development doesn't break existing features, it's an important skill to have!


## Project Learning

You will learn how to use Jasmine to write a number of tests against a pre-existing application. These will test the underlying business logic of the application as well as the event handling and DOM manipulation.


## Test-Suites

### `"RSS Feeds"` 
1.) Feeds are defined and are not empty
2.) All Feeds have  a URL defined and that the URL is not empty.
3.) All Feeds a name defined and that the name is not empty.

### `"The menu"`
1.) The menu element is hidden by default.
2.) The menu changes visibility when the menu icon is clicked. 

### `"Initial Entries"`
1.) When the `loadFeed` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container.

### `"New Feed Selection"`
1.) When a new feed is loaded by the `loadFeed` function that the content actually changes.

## Instructions to run the code
1.) Open index.html in your browser to execute the project and visualize the test results. 