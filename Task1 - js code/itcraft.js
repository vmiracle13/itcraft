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
        return Math.round(30 * 24 * this.costs);
    };

    try {
        let collection = {
            'Google Orkut' : 11,
            'Google Voice': 9.4,
            'YouTube': 8064,
            'Mandrill': 11.2,
            'Google Finance': 7.8,
            'LinkedIn': 6863,
            'Google Building Maker': 5347
        };

        //creation of array with objects of FixedHourlyCostPaidService and FixedMonthlyCostPaidService classes
        function createServiceObjects(data) {
            let i = 1;
            let servicesList = [];

            if (Object.keys(data).length == 0) {
                throw new SyntaxError("Empty data object. Please enter the correct data.");
            }

            for (let key in data) {
                if (!key || !data[key]) {
                    throw new SyntaxError("The incorrect input data.");
                }
                if (data[key] < 100) {
                    servicesList.push( new FixedHourlyCostPaidService('service' + i, key, data[key]) );
                    i++;
                }
            }

            for (let key in data) {
                if (data[key] > 100) {
                    servicesList.push( new FixedMonthlyCostPaidService('service' + i, key, data[key]) );
                    i++;
                }
            }

            return servicesList;
        }

        let arrayObjects = createServiceObjects(collection);

        let arrayOfCalculatedCosts = arrayObjects.map( function(obj) {
            let service = {};

            for (let key in obj) {
                if (key == 'id' || key == 'name') {
                    service[key] = obj[key];
                }
            }

            service.costs = obj.calculateAverageMonthlyCosts();
            return service;
        });

        // sort of the array of objects with decreasing of monthly costs
        function sortServices(arr) {
            return arr.sort( function(prev, next) {

                if ( next.costs == prev.costs) {
                    return prev.name.localeCompare(next.name);
                }

                return next.costs - prev.costs;
            });
        }

        let arrayForPrint = sortServices(arrayOfCalculatedCosts);

        //print the array of the objects
        function printServiceList(services) {
            let listForPrint = '';

            for (let i = 0; i < services.length; i++) {
                listForPrint = listForPrint + services[i].id + ' / ' + services[i].name + ' / ' + services[i].costs + '\n';
            }

            alert("sorted services: \n" + listForPrint);
        }

        printServiceList(arrayForPrint);

        //print first 5 (number) values of names of the sorted array (arrayForPrint)
        function printFirstServices(sortedArray, number) {
            let listForPrint = '';

            for (let i = 0; i < number; i++ ) {
                listForPrint = listForPrint + sortedArray[i].name + '\n';
            }

            alert(listForPrint);
        }

        printFirstServices(arrayForPrint, 5);

        //print last 3 values of id of the sorted array (arrayForPrint)
        function printLastServices(sortedServices, number) {
            let listForPrint = '';

            for (let i = sortedServices.length - number; i < sortedServices.length; i++ ) {
                listForPrint = listForPrint + sortedServices[i].id + '\n';
            }

            alert(listForPrint);
        }

        printLastServices(arrayForPrint, 3);

        /* compare the monthly costs of service1 and service2. Print the service names with decreasing of the monthly costs
         If they are equal, print them with '/' between */

        function compareServiceCosts(service1, service2, list) {
            try {
                if (!service1 || !service2 || !list || list.length == 0) {
                    throw new SyntaxError("Please check the input data.");
                }

                let obj1 = list.filter(x => x.name.toLowerCase() == service1.toLowerCase())[0];
                let obj2 = list.filter(x => x.name.toLowerCase() == service2.toLowerCase())[0];

                if (obj1 == undefined || obj2 == undefined) {
                    throw new SyntaxError("Please recheck the service names.")
                }

                if (obj1.costs < obj2.costs) {
                    alert(obj2.name  + '\n' +  obj1.name);
                } else if (obj1.costs > obj2.costs) {
                    alert(obj1.name + '\n' + obj2.name);
                } else {
                    alert(obj1.name + " / " + obj2.name);
                }
            }

            catch(e) {
                alert(e.message);
            }
        }

        compareServiceCosts('Mandrill', 'Youtube', arrayForPrint);
    }

    catch(error) {
        if (error.name == 'SyntaxError') {
            alert(error.message);
        }
    }

})();