## Website Performance Optimization Portfolio Project
#### Project Goals
1.) Achieve PageSpeed score of 90 for mobile and desktop.
2.) Optimizations made to views/js/main.js make views/pizza.html render with a consistent frame-rate at 60fps when scrolling.
## Getting Started with the Website
Use the [link](https://prateek13727.github.io/mobile-portfolio/) to go the project Website

#### Part 1: Optimize PageSpeed Insights score
The following optimizations were carried to achive the page insights score of
90+
##### Image Optimization
  **Resize** **Minify** and **Optimize** images using gulp

##### Font Optimizations
  Remove Font Link and replace the same with inline font
  Alternatively: Use [Web-Font-Loader](https://developers.google.com/fonts/docs/webfont_loader)

##### Render Blocking Optimizations
* **Prioritize Critical CSS:** Used Gulp for generating critical css.Also the critical css
  is inlined to improve the Page Insights Score.
* **Minify** the CSS files
* Place CSS at the bottom of the <body> tag to exclude it during loading of the  above the fold content.

##### Remove Parser Blocking Optimizations
* **Minify** the JS files and place them at the bottom
* Use **async** keyword inside script tag got the js files being loaded.

##### Note
Useful tips to help you get started:
1. Check out the repository
2. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
2. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ./ngrok http 8080
  ```
Copy the public URL ngrok gives you and try running it through PageSpeed Insights!

**Optional:** [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

#### Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, we need to modify views/js/main.js until your frames per second rate is 60 fps or higher.

##### Avoiding Recalculate Styles/Reflows : Identify FSL
Using dev tools find out  JavaScript  triggering Forced Synchronous Layouts
**How to optimize Forced Synchronous Layout (FSL) causing JS?**
* Separated Set and Get style changes to avoid  style calculations and reflows in quick succession
* Used Specific Query Selectors for DOM element selection : For e.g: use GetElementsByClassName instead of queryselector
* Removed element selections from the  loops
* Optimized the loop running condition i.e. made sure loop runs as many times as necessary For e.g. optimize looping condition by       viewport size ( while placing pizza elements on screen; used screen.height or width parameters to calculate the number of scrolling
  pizzas


##### Request Animation Frame:
Try running java-script at the earliest as  it has the capability to trigger all parts of a rendering pipeline
Wrapped repeatedly called method **updatePositions** inside request animation frame API.

##### Note
You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### Learning Resources
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api").
* [The fewer the downloads, the better](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html)
* [Reduce the size of text](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html)
* [Optimize images](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html)
* [HTTP caching](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html)


### Customization with Bootstrap
The portfolio was built on Twitter's [Bootstrap](http://getbootstrap.com/)framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* [Bootstrap's CSS Classes](http://getbootstrap.com/css/)
* [Bootstrap's Components](http://getbootstrap.com/components/)
