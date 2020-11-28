(function() {
  //data-model
  let data = {
    currentCat: null,
    catData: [
      {
        name: 'Cat1',
        image: 'images/cat1.jpg',
        clicks: 0
      },
      {
        name: 'Cat2',
        image: 'images/cat2.jpg',
        clicks: 0
      },
      {
        name: 'Cat3',
        image: 'images/cat3.jpg',
        clicks: 0
      }
    ]
  };
  //controller
  let octopus = {
    init: function () {
      //initialize view
      viewCatList.init();
      viewCatDisplay.init();
      viewAdmin.init();
    },
    addClicks: function () {
      let catObj = this.getCurrentCat();
      catObj.clicks += 1;
    },
    getAllCats: function () {
      return data.catData;
    },
    setCurrentCat: function (catObj) {
      data.currentCat = catObj;
    },
    getCurrentCat: function () {
      return data.currentCat;
    },
    modifyCurrentCatDB: function (name, imageUrl, clicks) {
      data.currentCat.name = name;
      data.currentCat.image = imageUrl;
      data.currentCat.clicks = clicks;
    }
  };

  let viewCatList = {
    //initialize function
    init: function() {
      this.allCats = octopus.getAllCats();
      this.list = document.getElementById('cat-list');
      for (i=0; i<this.allCats.length; i++) {
        let cat = this.allCats[i]
        //create list element
        let entry = document.createElement('li');
        let idStr = 'cat' + i;
        entry.id = idStr;
        // add to cat-list
        this.list.appendChild(entry);
        //binding click
        entry.addEventListener('click', (function(catObj) {
          return function () {
            octopus.setCurrentCat(catObj)
            viewCatDisplay.render();
          }
        } )(cat), false);
      }
      //default cat to display
      octopus.setCurrentCat(this.allCats[0])
      //render cat list
      this.render();
    },
    //render functionality
    render: function () {
      for (i=0; i<this.allCats.length; i++) {
        let idStr = 'cat' + i;
        let entry = document.getElementById(idStr)
        entry.innerHTML = this.allCats[i].name;
      }
    }
  };

  let viewCatDisplay = {
    //initialize function
    init: function() {
      this.headerElement = document.getElementById('cat-header');
      this.imageElement = document.getElementById('cat-image');
      this.clickElement = document.getElementById('cat-clicks');
      //binding click
      this.imageElement.addEventListener('click', () => {
          octopus.addClicks();
          this.render();
      }, false);
      //render cat
      this.render();
    },

    //render functionality
    render: function () {
      let catObj = octopus.getCurrentCat();
      //cat-name
      this.headerElement.innerHTML = catObj.name;
      //cat-image
      this.imageElement.src = catObj.image;
      //cat-clicks
      this.clickElement.innerHTML = catObj.clicks;
    }
  };

  let viewAdmin = {
    init: function () {
      //Adding Callback to Admin button
      this.adminButton = document.getElementById('button-admin');
      this.adminButton.addEventListener('click', () => {
          let formInputDiv = document.getElementById("form-input");
          formInputDiv.style.display = 'block'
      }, false);
      //Adding Callback to save button
      this.saveButton = document.getElementById('button-save');
      this.saveButton.addEventListener('click', () => {
          let name = document.getElementById("name-input").value;
          let imageUrl = document.getElementById("url-input").value;
          let clicks = document.getElementById("clicks-input").value;
          //modify DB of the currentCat with the values from UI
          octopus.modifyCurrentCatDB(name, imageUrl, clicks);
          viewCatDisplay.render();
      }, false);
      //Adding Callback to Cancel button
      this.cancelButton = document.getElementById('button-cancel');
      this.cancelButton.addEventListener('click', () => {
          let formInputDiv = document.getElementById("form-input");
          formInputDiv.style.display = 'none'
      }, false);

    }
  }

  octopus.init();
}());
