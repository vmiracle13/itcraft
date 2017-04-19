(function() {

  function PaidService(id, name, costs) {
     this.id = id;
     this.name = name;
     this.costs = costs;
  }

  FixedMonthlyCostPaidService.prototype = Object.create(PaidService.prototype);
  FixedHourlyCostPaidService.prototype = Object.create(PaidService.prototype);


  FixedMonthlyCostPaidService.prototype.calculateAverageMonthlyCosts = function() {
     return this.costs;
  };

  function FixedMonthlyCostPaidService() {
     PaidService.apply(this, arguments);
  }

  function FixedHourlyCostPaidService() {
     PaidService.apply(this, arguments);
  }

  PaidService.prototype.calculateAverageMonthlyCosts = function() {
     this.costs = costs;
  };

  FixedHourlyCostPaidService.prototype.calculateAverageMonthlyCosts = function() {
     var sum = this.costs;
     return Math.round(30 * 24 * sum);
  };

  try {
     let collection = {
       'Google Orkut' : 11,
       'Google Voice': 9.4,
       'Youtube': 8064,
       'Mandrill': 11.2,
       'Google Finance': 7.8,
       'Google Building Maker': 5347,
       'LinkedIn': 6863
     };

     function createServiceObjects(data) {
        let i = 1;
        let array = [];
        for (let key in data) {
           if (!key || !data[key]) {
              throw new SyntaxError("»сходные данные некорректны.");
           }
           if ( data[key] < 100) {
              array.push( new FixedHourlyCostPaidService('service' + i, key, data[key]) );
           } else {
              array.push( new FixedMonthlyCostPaidService('service' + i, key, data[key]) );
           }
           i++;
        }

        return array;
     }

     let arrayObjects = createServiceObjects(collection);

     let arrayOfCalculatedCosts = arrayObjects.map( function(obj) {
        obj.costs = obj.calculateAverageMonthlyCosts();
        return obj;
     });

     function sortServices(arr) {
        return arr.sort( function(prev, next) {
           if ( next.costs == prev.costs) {
              return prev.name.localeCompare(next.name);
           }
           return next.costs - prev.costs;
        });
     }

     let arrayForPrint = sortServices(arrayOfCalculatedCosts);

     /* сортировка сервисов по убыванию среднемес€чных затрат. ѕри совпадении суммы затрат
     сортировка по алфавитному пор€дку названий сервисов */
     function printServiceList(sorted) {
        let listForPrint = '';

        for (let i = 0; i < sorted.length; i++) {
           listForPrint = listForPrint + sorted[i].id + ' / ' + sorted[i].name + ' / ' + sorted[i].costs + '\n';
        }

        alert("sorted \n" + listForPrint);
     }

     printServiceList(arrayForPrint);

     //значени€ свойства name в первых 5 элементах
     function printFirstServices(sorted, number) {
        let listForPrint = '';

        for (let i = 0; i < number; i++ ) {
           listForPrint = listForPrint + sorted[i].name + '\n';
        }

        alert(listForPrint);
     }

     printFirstServices(arrayForPrint, 5);

     //значени€ свойства id в последних 3 элементах
     function printLastServices(sorted, number) {
        let listForPrint = '';

        for (let i = arrayForPrint.length - number; i < arrayForPrint.length; i++ ) {
           listForPrint = listForPrint + sorted[i].id + '\n';
        }

        alert(listForPrint);
     }

     printLastServices(arrayForPrint, 3);

     //сравнить затраты на два сервиса и вывести их в пор€дке убывани€. ≈сли равны, то через слеш /
     function compareServiceCosts(service1, service2, list) {
        let obj1 = list.filter(x => x.name.toLowerCase() == service1.toLowerCase())[0];
        let obj2 = list.filter(x => x.name.toLowerCase() == service2.toLowerCase())[0];

        if ( obj1.costs < obj2.costs ) {
           alert(obj2.name  + '\n' +  obj1.name);
        } else if (obj1.costs > obj2.costs) {
           alert(obj1.name + '\n' + obj2.name);
        } else {
           alert(obj1.name + " / " + obj2.name);
        }
     }

     compareServiceCosts('YouTube', 'Mandrill', arrayForPrint);
  }

  catch(error) {
     if (error.name == 'SyntaxError') {
        alert(error.message);
     }
  }

})();