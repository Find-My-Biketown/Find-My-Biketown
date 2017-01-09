# Find-My-Biketown
A web app that helps users find the nearest Biketown station from their input location.
                
                
                ~MVP~
                
As an avid but not tech-savvy cyclist, who somehow doesn't own my own bike or at least doesn't bring it everywhere with me, I'm excited as heck
about BikeTown rental bikes and want there to be an app that allows me to find out the nearest BikeTown station(s) to me.

As a developer, I want to create that app for that user, where they can enter their address, that address is validated, and a list of BikeTown
stations sorted from nearest to farthest pops up for them, along with a Google Map with pins of BikeTown locations.  In doing this, I want to 
use outside API (Google Maps/Geocoding, and Biketown's own API), RESTful access of web services, a strong MVC model for my app code, a server,
mobile-first design principles, and deploy my app on heroku.

Developer Outline:
-Create base HTML and CSS structure giving user info about app and how to use it
-Creating form field for user address entry, using geocoding API to verify
     address, and providing limited options for city and ZIP code in drop-down
     menu in form -- required fields to try to minimize errors.
-Use Geocoding/Maps API's to verify address
-Geocoding API converts address to set of coordinates
-Our script will take those coordinates and run them against coordinates fetched
     from BikeTown API to find out distance between user and each station
-Each station distance becomes an object in an array, and that array is sorted
     in ascending order of distance
-The sorted objects are then appended to the HTML to show the user which station(s)
     are closest to them
-We include a Google Map showing the "pins" of the user and bike stations. 

-STRETCH GOALS:
 1. Show on map or on click route from user's location to nearest bike station (or bike station pin that is clicked)
 2. Show bike paths/routes near to station that is clicked on.
