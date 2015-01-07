// Function wrapper
(function() {
  'use strict';

  /* Controllers */
  angular.module('conversionApp.controllers', [])

  // The UIModel stores all user interface values between session states
  // Should be written to local storage, to keep session states between visits
  .factory('UIModel', [ function(){
    return {
      selectableWordPrices: [],
      selectableLinePrices: [],
      showDetails: false,
      // Loads the selectable prices arrays
      loadPrices: function() {
      var price;
      for (price = 0.10; price <= 0.5; price += 0.01)
        this.selectableWordPrices.push(price.toPrecision(2));
        for (price = 0.90; price <= 2.5; price += 0.05)
          this.selectableLinePrices.push(price.toPrecision(3));
        }
      };
    }])

  // All language data and language calculations are stored and executed here
  .service('Converter', ['$http', function($http) {

    var Converter = this;

    Converter.dataModel = {
      wordPrice: '0.20',
      linePrice: '1.50',
      linePriceString: "€ " + this.linePrice,
      wordPriceString: "€ " + this.wordPrice,
      languageData: [],
      currentLanguage: {},
      allLinePrices: [],
      allWordPrices: [],
      allWordsPerLine: [],
      allSources: []
    };

    var m = Converter.dataModel;

    //
    // Word to Line Prices
    //
    Converter.calculateLinePrices = function() {
      var chars = m.currentLanguage.charsPerWord,
          linePrice,
          charsPerWord;
      m.allLinePrices = [];

      // Loop through all charPerWord values
      Object.keys(chars).forEach(function(key) {
        charsPerWord = chars[key];
        linePrice = m.wordPrice / charsPerWord * 55;
        // Conditional to prevent values of Infinity (division by zero)
        if (charsPerWord !== 0) m.allLinePrices.push(linePrice);
      });

      m.linePriceString = getLinePriceString();
    };

    function getLinePriceString() {
      var maxPrice = Math.max.apply(Math, m.allLinePrices),
          minPrice = Math.min.apply(Math, m.allLinePrices);

      maxPrice = maxPrice.toPrecision(3);
      minPrice = minPrice.toPrecision(3);

      if (maxPrice === minPrice) {
        return "€ " + minPrice;
      } else {
        return "€ " +
        minPrice+ " - € " +
        maxPrice;
      }
    }

    //
    // Line to Word Prices
    //
    Converter.calculateWordPrices = function() {
      var chars = m.currentLanguage.charsPerWord,
      wordPrice,
      charsPerWord;
      m.allWordPrices = [];

      // Loop through all charPerWord values
      Object.keys(chars).forEach(function(key) {
        charsPerWord = chars[key];
        wordPrice = m.linePrice * charsPerWord / 55;
        // Conditional to prevent values of Infinity (division by zero)
        if (charsPerWord !== 0) m.allWordPrices.push(wordPrice);
      });

      m.wordPriceString = getWordPriceString();
    };

    function getWordPriceString() {
      var maxPrice = Math.max.apply(Math, m.allWordPrices),
      minPrice = Math.min.apply(Math, m.allWordPrices);

      maxPrice = maxPrice.toPrecision(2);
      minPrice = minPrice.toPrecision(2);

      if (maxPrice === minPrice) {
        return "€ " + minPrice;
      } else {
        return "€ " +
        minPrice + " - € " +
        maxPrice;
      }
    }

    //
    // Details
    //
    Converter.calculateWordsPerLine = function() {
      var chars = m.currentLanguage.charsPerWord,
          wordsPerLine,
          charsPerWord;
      m.allWordsPerLine = [];
      m.allSources = [];

      // Loop through charsPerWord object
      Object.keys(chars).forEach(function(key) {
        wordsPerLine = 0;
        charsPerWord = chars[key];
        wordsPerLine = 55 / charsPerWord;
        // Conditional to prevent values of Infinity (division by zero)
        if (charsPerWord !== 0) m.allWordsPerLine.push(wordsPerLine);
        if (charsPerWord !== 0) m.allSources.push(key);
      });
    };

    // Loads all data from arrays and json file
    Converter.loadData = function() {
      $http.get('data/languageData2.json').success(function(data) {
        m.languageData = data;
        // Default language = nr 4, German
        m.currentLanguage = data[3];

        // Do 1st time calculations
        Converter.calculateWordPrices();
        Converter.calculateLinePrices();
        Converter.calculateWordsPerLine();
      });
    };
  }])

  .controller('InitCtrl', ['Converter', 'UIModel',
                    function(Converter, UIModel) {
    //
    // Load the language data from the JSON file
    //
    Converter.loadData();
    UIModel.loadPrices();
  }])

  .controller('Word2LineCtrl', ['$scope', 'Converter', 'UIModel',
                        function($scope, Converter, UIModel) {

    init();

    // New word price -> the model calculates a new line price
    $scope.uponWordPriceChange = function() {
      Converter.calculateLinePrices();
    };

    // New language selected -> the model calculates a new line price
    $scope.uponLanguageChange = function() {
      Converter.calculateLinePrices();
      Converter.calculateWordsPerLine();
    };

    // All initialisation in this function
    function init() {
      // Set word + line prices to default values on init
      $scope.UIModel = UIModel;
      $scope.dataModel = Converter.dataModel;
      Converter.calculateLinePrices();
      Converter.calculateWordsPerLine();

    }
  }])

  .controller('Line2WordCtrl', ['$scope', 'Converter', 'UIModel',
                        function($scope, Converter, UIModel) {

    init();

    // New word price -> the model calculates a new line price
    $scope.uponLinePriceChange = function() {
      Converter.calculateWordPrices();
    };

    // New language selected -> the model calculates a new line price
    $scope.uponLanguageChange = function() {
      Converter.calculateWordPrices();
      Converter.calculateWordsPerLine();
    };

    // All initialisation in this function
    function init() {
      // Set word + line prices to default values on init
      $scope.UIModel = UIModel;
      $scope.dataModel = Converter.dataModel;
      Converter.calculateWordPrices();
      Converter.calculateWordsPerLine();
    }
  }])

  .controller('AboutCtrl', ['$scope', 'Converter',
                    function($scope, Converter) {

      $scope.dataModel = Converter.dataModel;

  }]);

})(); // End of function wrapper
