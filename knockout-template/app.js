

let initialCats = [
  {
    name: 'Cat1',
    image: 'images/cat1.jpg',
    clicks: 0,
    nicknames: ['Mew', 'Pussy', 'Julia']
  },
  {
    name: 'Cat2',
    image: 'images/cat2.jpg',
    clicks: 0,
    nicknames: ['Mew', 'Pussy', 'Julia']
  },
  {
    name: 'Cat3',
    image: 'images/cat3.jpg',
    clicks: 0,
    nicknames: ['Mew', 'Pussy', 'Julia']
  }
]

//Model
let cat = function(data) {
  this.image = ko.observable(data.image);
  this.clicks = ko.observable(data.clicks);
  this.nickNames = ko.observable(data.nicknames);

  //computed observable
  this.name = ko.computed ( () => {
    if (this.clicks() <= 10) {
      return data.name
    } else if (this.clicks() > 10 && this.clicks() <= 25) {
      return 'Baby';
    } else if (this.clicks() > 25 && this.clicks() <= 75) {
      return 'Teen';
    } else if (this.clicks() > 75) {
      return 'Adult';
    }
  });
}

//View Model
let viewModel = function() {
  this.catList = ko.observableArray();

  initialCats.forEach( (item) => {
    this.catList.push(new cat(item));
  });

  //default cat display
  this.currentCat = ko.observable(this.catList()[0])

  this.addClicks = () => {
    this.currentCat().clicks(this.currentCat().clicks() + 1);
  };

  this.setCat = (catObj) => {
      this.currentCat(catObj)
  }
}

ko.applyBindings(new viewModel());
