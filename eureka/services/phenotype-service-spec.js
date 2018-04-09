(function() {
    'use strict';

    var ProxyService, $httpBackend, ConfigFileService;

    registerSetup();
    registerTeardown();

    describe('PhenotypeService', function() {
        var userElements, PhenotypeService;

	beforeEach(inject(function(_PhenotypeService_) {
	    PhenotypeService = _PhenotypeService_;      
        }));

	beforeEach(function() {
	    userElements = {
                blah: 'test'
            };
	    $httpBackend.whenGET(
		'https://localhost:8000/cas-mock/serviceValidate?service=http:%2F%2Flocalhost:9876%2Fcontext.html')
                .respond(userElements);
	});

	it('should be defined', function() {
            expect(PhenotypeService).toBeDefined();
	    $httpBackend.flush();
        });

    });

    describe('getPhenotypeRoot', function() {
        var userElements, registryUserMenuItems, PhenotypeService;

	beforeEach(inject(function(_PhenotypeService_) {
	    PhenotypeService = _PhenotypeService_;
        }));

	beforeEach(function() {
	    userElements = {
                blah: 'test'
            };
	    $httpBackend.whenGET(
		'https://localhost:8000/cas-mock/serviceValidate?service=http:%2F%2Flocalhost:9876%2Fcontext.html')
                .respond(userElements);
	});

        beforeEach(function () {
            userElements = {
                blah: 'test'
            };
            $httpBackend.whenGET('https://localhost:8443/eurekaclinical-analytics-webapp/proxy-resource/phenotypes?summarize=true')
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

	beforeEach(inject(function(_ProxyService_, _$httpBackend_, _ConfigFileService_) {
	    ProxyService = _ProxyService_;
	    $httpBackend = _$httpBackend_;
	    ConfigFileService = _ConfigFileService_;
	}));

	beforeEach(function() {
	    $httpBackend.whenGET('config.json')
		.respond({
		    casLoginUrl: 'https://localhost:8443/cas-mock/login',
		    logoutUrl: 'https://localhost:8443/cas-mock/logout',
		    eurekaWebappUrl: 'https://localhost:8443/eurekaclinical-analytics-webapp'
		});
	});

	beforeEach(function() {
	    $httpBackend.whenGET('https://localhost:8443/eurekaclinical-analytics-webapp/proxy-resource/appproperties/')
		.respond({
		    appPropertiesModes: {},
		    appPropertiesLinks: {},
		    appPropertiesRegistration: {}
		});
	});

	beforeEach(function() {
	    $httpBackend.whenGET('https://localhost:8443/eurekaclinical-analytics-webapp/destroy-session')
	    	.respond({});
	});

	beforeEach(function() {
	    var getSessionResponse = '<html><head></head><body><script type="text/javascript">parent.postMessage(\'OK\', \'https://localhost:8443/eurekaclinical-analytics-webapp\');</script></body></html>';
	    $httpBackend.whenGET('https://localhost:8443/eurekaclinical-analytics-webapp/protected/get-session')
		.respond(getSessionResponse);
	});

	beforeEach(function() {
	    var meResponse = {
		id: 0,
		username: 'superuser'
	    };
	    $httpBackend.whenGET('https://localhost:8443/eurekaclinical-analytics-webapp/proxy-resource/users/me')
		.respond(meResponse);
	});

	beforeEach(function() {
	    var registryUserMenuItems = [];
	    $httpBackend.whenGET(
		'https://localhost:8443/eurekaclinical-analytics-webapp/proxy-resource/components?type=WEBAPP&type=EXTERNAL')
                .respond(registryUserMenuItems);
	});

	
    }

    function registerTeardown() {
	
	afterEach(function() {
	    ProxyService.destroySession();
	    $httpBackend.flush();
	});
    }

}());
