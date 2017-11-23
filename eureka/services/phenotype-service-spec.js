(function() {
    'use strict';

    var ProxyService, $httpBackend;

    registerSetup();
    registerTeardown();

    describe('PhenotypeService', function() {
        var PhenotypeService, $timeout;

	beforeEach(inject(function(_PhenotypeService_, $injector) {
	    PhenotypeService = _PhenotypeService_;
	    $timeout = $injector.get('$timeout')
        }));

	it('should be defined', function() {
	    $timeout.flush();
            expect(PhenotypeService).toBeDefined();
	    $httpBackend.flush();
        });

    });

    describe('getPhenotypeRoot', function() {
        var userElements, PhenotypeService;

	beforeEach(inject(function(_PhenotypeService_) {
	    PhenotypeService = _PhenotypeService_;
        }));

        beforeEach(function () {
            userElements = {
                blah: 'test'
            };
            $httpBackend.whenGET('eureka-webapp/proxy-resource/phenotypes?summarize=true')
                .respond(userElements);
        });

        it('should get the user phenotypes', function() {
            PhenotypeService.getPhenotypeRoot().then(function(res) {
                expect(res).toEqual(userElements);
            });
            $httpBackend.flush();
        });

    });

    function registerSetup() {
	
	beforeEach(function() {
	    module('eureka');
	});

	beforeEach(inject(function(_ProxyService_, _$httpBackend_) {
	    ProxyService = _ProxyService_;
	    $httpBackend = _$httpBackend_;
	}));

	beforeEach(function() {
	    $httpBackend.whenGET('eureka-webapp/proxy-resource/appproperties/')
		.respond({
		    appPropertiesModes: {},
		    appPropertiesLinks: {},
		    appPropertiesRegistration: {}
		});
	});

	beforeEach(function() {
	    $httpBackend.whenGET('eureka-webapp/destroy-session')
	    	.respond({});
	});

	beforeEach(function() {
	    var getSessionResponse = '<html><head></head><body><script type="text/javascript">parent.postMessage(\'OK\', \'https://localhost:8443/eureka-webapp\');</script></body></html>';
	    $httpBackend.whenGET('eureka-webapp/protected/get-session')
		.respond(getSessionResponse);
	});

	beforeEach(function() {
	    var meResponse = {
		id: 0,
		username: 'superuser'
	    };
	    $httpBackend.whenGET('eureka-webapp/proxy-resource/users/me')
		.respond(meResponse);
	});

	beforeEach(function() {
	    $httpBackend.whenGET('config.json')
		.respond({
		    casLoginUrl: 'https://localhost:8443/cas-server/login',
		    logoutUrl: 'https://localhost:8443/cas-server/logout',
		    eurekaWebappUrl: 'https://localhost:8000/eureka-webapp'
		});
	});
    }

    function registerTeardown() {
	
	afterEach(function() {
	    ProxyService.destroySession();
	    $httpBackend.flush();
	});
    }

}());
