# Eureka! Clinical Analytics Web Client
[Atlanta Clinical and Translational Science Institute (ACTSI)](http://www.actsi.org), [Emory University](http://www.emory.edu), Atlanta, GA

## What does it do?
This project contains the web client for Eureka! Clinical
Analytics. It is an angularjs single-page site.

## Version 1.0 development series
Latest release:
[![Latest release](https://maven-badges.herokuapp.com/maven-central/org.eurekaclinical/eurekaclinical-analytics-webclient/badge.svg)](https://maven-badges.herokuapp.com/maven-central/org.eurekaclinical/eurekaclinical-analytics-webclient)

## Version history
No final releases yet. This code used to be in the eureka project.

## Build requirements
* [Oracle Java JDK 8](http://www.oracle.com/technetwork/java/javase/overview/index.html)
* [Maven 3.2.5 or greater](https://maven.apache.org)

## Runtime requirements
* Any web browser that is supported by AngularJS version 1.5 (see
  https://docs.angularjs.org/misc/faq).
* `eureka-webapp` version 3.0-Alpha-23 from
  https://oss.sonatype.org/content/groups/public/org/eurekaclinical/eureka-webapp/3.0-Alpha-23/eureka-webapp-3.0-Alpha-23.war,
  accessible over the internet from your web browser. See
  https://github.com/eurekaclinical/eureka for installation instructions.
* `eureka-services` version 3.0-Alpha-23 from
  https://oss.sonatype.org/content/groups/public/org/eurekaclinical/eureka-webapp/3.0-Alpha-23/eureka-webapp-3.0-Alpha-23.war,
  accessible over the internet from your web browser. See
  https://github.com/eurekaclinical/eureka for installation instructions.
* `eureka-protempa-etl` version 3.0-Alpha-23 from
  https://oss.sonatype.org/content/groups/public/org/eurekaclinical/eureka-webapp/3.0-Alpha-23/eureka-webapp-3.0-Alpha-23.war,
  accessible over the internet from your web browser. See
  https://github.com/eurekaclinical/eureka for installation
  instructions.

## Building it
We use maven, node, and gulp to build the project. You need to install
maven on your computer. Maven handles downloading and installing node
and gulp for you. Maven installs node in the .eurekaclinical/dev
directory in your home directory. It installs the node modules that
are needed to build this project in the node_modules directory at the
root of this project.

To build the project, execute `mvn clean install` at the command
line. For simple file changes, not additions or deletions, you can
usually use `mvn install`. To create a zipfile suitable for
distribution, execute `mvn install -Pdist`.

## Performing system tests
To run the web client on your machine for testing purposes, do the
following:

1. Clone the [eureka](https://github.com/eurekaclinical/eureka)
project from GitHub, and execute `mvn clean install`
followed by `mvn tomcat7:run` in the root directory of the eureka
project on the command line to run the server-side Eureka! Clinical
Analytics code in embedded tomcat.
2. Back in the root directory of the web client project, execute
`mvn clean install -Pwebserver`. It will open the web client in your
default web browser at https://localhost:8000 in an embedded web
server. You can leave the backend eureka code running while you
repeatedly build and run the web client.

## Installation
Copy the contents of the `dist` directory into your web server's
content directory in the folder of your choice.

### Configuration
This web client is configured using a JSON file, `config.json`, that
should be in the same directory as the index.html file on your web
server. It supports specifying the following options:
* `casLoginUrl`: The URL for logging into your CAS server. The default
  value is `https://localhost:8443/cas-server/login`.
* `logoutUrl`: The URL that the web client will go to when the user
  clicks the `Logout` click in the upper right corner of the
  page. Before going to this URL, the web client will destroy the
  user's session. The default value is
  `https://localhost:8443/cas-server/logout`, which logs the user out
  of CAS.
* `eurekaWebappUrl`: The URL for eureka-webapp, which is the proxy for
  this web client. The default value is
  `https://localhost:8443/eureka-webapp`.

Specify the options as properties of a single JSON object. See the
default `config.json` file in the root directory of this project for a
sample. The default file is copied into the `dist` directory during the
build process.

## Developer documentation
The build process creates an `ng-docs` directory in the root directory
of this project. Load the `index.html` file in this directory into
your web browser to view the developer documentation.

## Getting help
Feel free to contact us at help@eurekaclinical.org.
