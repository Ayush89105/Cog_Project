import React, { useState, useRef, useEffect } from "react";
import { Plane, MapPin, Clock, Wind, Cloud, AlertCircle, CheckCircle } from "lucide-react";
import Background from "./Background";

const EnhancedFlightPredict = () => {
  // 10 major airports with coordinates
  const airports = [
    { id: 1, iata: "JFK", lat: 40.6413, lng: -73.7781, name: "John F. Kennedy International Airport", city: "New York, NY" },
    { id: 2, iata: "LAX", lat: 33.9416, lng: -118.4085, name: "Los Angeles International Airport", city: "Los Angeles, CA" },
    { id: 3, iata: "ORD", lat: 41.9742, lng: -87.9073, name: "Chicago O'Hare International Airport", city: "Chicago, IL" },
    { id: 4, iata: "DFW", lat: 32.8998, lng: -97.0403, name: "Dallas/Fort Worth International Airport", city: "Dallas, TX" },
    { id: 5, iata: "DEN", lat: 39.8561, lng: -104.6737, name: "Denver International Airport", city: "Denver, CO" },
    { id: 6, iata: "ATL", lat: 33.6407, lng: -84.4277, name: "Hartsfield-Jackson Atlanta International Airport", city: "Atlanta, GA" },
    { id: 7, iata: "SFO", lat: 37.6213, lng: -122.379, name: "San Francisco International Airport", city: "San Francisco, CA" },
    { id: 8, iata: "SEA", lat: 47.4502, lng: -122.3088, name: "Seattle-Tacoma International Airport", city: "Seattle, WA" },
    { id: 9, iata: "MIA", lat: 25.7959, lng: -80.287, name: "Miami International Airport", city: "Miami, FL" },
    { id: 10, iata: "BOS", lat: 42.3656, lng: -71.0096, name: "Boston Logan International Airport", city: "Boston, MA" },
    { id: 11, iata: "ADQ", lat: 57.75, lng: -152.4939, name: "Kodiak Airport", city: "Kodiak, AK" },
{ id: 12, iata: "AEX", lat: 31.3274, lng: -92.5486, name: "Alexandria International Airport", city: "Alexandria, LA" },
{ id: 13, iata: "AGS", lat: 33.37, lng: -81.9645, name: "Augusta Regional Airport (Bush Field)", city: "Augusta, GA" },
{ id: 14, iata: "AKN", lat: 58.6768, lng: -156.6492, name: "King Salmon Airport", city: "King Salmon, AK" },
{ id: 15, iata: "ALB", lat: 42.7481, lng: -73.803, name: "Albany International Airport", city: "Albany, NY" },
{ id: 16, iata: "ALO", lat: 42.5571, lng: -92.4003, name: "Waterloo Regional Airport", city: "Waterloo, IA" },
{ id: 17, iata: "AMA", lat: 35.2194, lng: -101.7059, name: "Rick Husband Amarillo International Airport", city: "Amarillo, TX" },
{ id: 18, iata: "ANC", lat: 61.1743, lng: -149.9962, name: "Ted Stevens Anchorage International Airport", city: "Anchorage, AK" },
{ id: 19, iata: "APN", lat: 45.0781, lng: -83.5603, name: "Alpena County Regional Airport", city: "Alpena, MI" },
{ id: 20, iata: "ASE", lat: 39.2232, lng: -106.8688, name: "Aspen-Pitkin County Airport", city: "Aspen, CO" },
{ id: 21, iata: "ATL", lat: 33.6404, lng: -84.4269, name: "Hartsfield-Jackson Atlanta International Airport", city: "Atlanta, GA" },
{ id: 22, iata: "ATW", lat: 44.2574, lng: -88.5195, name: "Appleton International Airport", city: "Appleton, WI" },
{ id: 23, iata: "AUS", lat: 30.1945, lng: -97.6699, name: "Austin-Bergstrom International Airport", city: "Austin, TX" },
{ id: 24, iata: "AVL", lat: 35.4362, lng: -82.5418, name: "Asheville Regional Airport", city: "Asheville, NC" },
{ id: 25, iata: "AVP", lat: 41.3381, lng: -75.7243, name: "Wilkes-Barre/Scranton International Airport", city: "Wilkes-Barre/Scranton, PA" },
{ id: 26, iata: "AZO", lat: 42.2349, lng: -85.5521, name: "Kalamazoo/Battle Creek International Airport", city: "Kalamazoo, MI" },
{ id: 27, iata: "BDL", lat: 41.9389, lng: -72.6832, name: "Bradley International Airport", city: "Windsor Locks, CT" },
{ id: 28, iata: "BET", lat: 60.7798, lng: -161.838, name: "Bethel Airport", city: "Bethel, AK" },
{ id: 29, iata: "BFL", lat: 35.4336, lng: -119.0568, name: "Meadows Field", city: "Bakersfield, CA" },
{ id: 30, iata: "BGM", lat: 42.2085, lng: -75.9796, name: "Greater Binghamton Airport", city: "Binghamton, NY" },
{ id: 31, iata: "BGR", lat: 44.8074, lng: -68.8281, name: "Bangor International Airport", city: "Bangor, ME" },
{ id: 32, iata: "BHM", lat: 33.5629, lng: -86.7536, name: "Birmingham-Shuttlesworth International Airport", city: "Birmingham, AL" },
{ id: 33, iata: "BIL", lat: 45.8077, lng: -108.5429, name: "Billings Logan International Airport", city: "Billings, MT" },
{ id: 34, iata: "BIS", lat: 46.7741, lng: -100.7467, name: "Bismarck Municipal Airport", city: "Bismarck, ND" },
{ id: 35, iata: "BJI", lat: 47.5094, lng: -94.9337, name: "Bemidji Regional Airport", city: "Bemidji, MN" },
{ id: 36, iata: "BLI", lat: 48.7927, lng: -122.5375, name: "Bellingham International Airport", city: "Bellingham, WA" },
{ id: 37, iata: "BMI", lat: 40.478, lng: -88.9159, name: "Central Illinois Regional Airport at Bloomington-Normal", city: "Bloomington, IL" },
{ id: 38, iata: "BNA", lat: 36.1245, lng: -86.6782, name: "Nashville International Airport", city: "Nashville, TN" },
{ id: 39, iata: "BOI", lat: 43.5644, lng: -116.2228, name: "Boise Airport (Boise Air Terminal)", city: "Boise, ID" },
{ id: 40, iata: "BOS", lat: 42.3644, lng: -71.0052, name: "Gen. Edward Lawrence Logan International Airport", city: "Boston, MA" },
{ id: 41, iata: "BPT", lat: 29.9508, lng: -94.0207, name: "Jack Brooks Regional Airport (Southeast Texas Regional)", city: "Beaumont/Port Arthur, TX" },
{ id: 42, iata: "BQK", lat: 31.259, lng: -81.4663, name: "Brunswick Golden Isles Airport", city: "Brunswick, GA" },
{ id: 43, iata: "BQN", lat: 18.4949, lng: -67.1294, name: "Rafael Hernández Airport", city: "Aguadilla, PR" },
{ id: 44, iata: "BRD", lat: 46.3979, lng: -94.1372, name: "Brainerd Lakes Regional Airport", city: "Brainerd, MN" },
{ id: 45, iata: "BRO", lat: 25.9068, lng: -97.4259, name: "Brownsville/South Padre Island International Airport", city: "Brownsville, TX" },
{ id: 46, iata: "BRW", lat: 71.2854, lng: -156.766, name: "Wiley Post-Will Rogers Memorial Airport", city: "Barrow, AK" },
{ id: 47, iata: "BTM", lat: 45.9548, lng: -112.4975, name: "Bert Mooney Airport", city: "Butte, MT" },
{ id: 48, iata: "BTR", lat: 30.5332, lng: -91.1496, name: "Baton Rouge Metropolitan Airport", city: "Baton Rouge, LA" },
{ id: 49, iata: "BTV", lat: 44.473, lng: -73.1503, name: "Burlington International Airport", city: "Burlington, VT" },
{ id: 50, iata: "BUF", lat: 42.9405, lng: -78.7322, name: "Buffalo Niagara International Airport", city: "Buffalo, NY" },
{ id: 51, iata: "BUR", lat: 34.2006, lng: -118.3585, name: "Bob Hope Airport (Hollywood Burbank Airport)", city: "Burbank, CA" },
{ id: 52, iata: "BWI", lat: 39.1754, lng: -76.6682, name: "Baltimore-Washington International Airport", city: "Baltimore, MD" },
{ id: 53, iata: "BZN", lat: 45.7769, lng: -111.153, name: "Bozeman Yellowstone International Airport (Gallatin Field Airport)", city: "Bozeman, MT" },
{ id: 54, iata: "CAE", lat: 33.9388, lng: -81.1195, name: "Columbia Metropolitan Airport", city: "Columbia, SC" },
{ id: 55, iata: "CAK", lat: 40.9163, lng: -81.4425, name: "Akron-Canton Regional Airport", city: "Akron, OH" },
{ id: 56, iata: "CDC", lat: 37.701, lng: -113.0986, name: "Cedar City Regional Airport", city: "Cedar City, UT" },
{ id: 57, iata: "CDV", lat: 60.4918, lng: -145.4777, name: "Merle K. (Mudhole) Smith Airport", city: "Cordova, AK" },
{ id: 58, iata: "CEC", lat: 41.7802, lng: -124.2365, name: "Del Norte County Airport (Jack McNamara Field)", city: "Crescent City, CA" },
{ id: 59, iata: "CHA", lat: 35.0353, lng: -85.2038, name: "Chattanooga Metropolitan Airport (Lovell Field)", city: "Chattanooga, TN" },
{ id: 60, iata: "CHO", lat: 38.1386, lng: -78.4529, name: "Charlottesville-Albemarle Airport", city: "Charlottesville, VA" },
{ id: 61, iata: "CHS", lat: 32.8987, lng: -80.0405, name: "Charleston International Airport/Charleston AFB", city: "Charleston, SC" },
{ id: 62, iata: "CID", lat: 41.8846, lng: -91.7109, name: "The Eastern Iowa Airport", city: "Cedar Rapids, IA" },
{ id: 63, iata: "CIU", lat: 46.2507, lng: -84.4724, name: "Chippewa County International Airport", city: "Sault Ste. Marie, MI" },
{ id: 64, iata: "CLD", lat: 33.1272, lng: -117.2787, name: "McClellan-Palomar Airport", city: "San Diego, CA" },
{ id: 65, iata: "CLE", lat: 41.4109, lng: -81.8494, name: "Cleveland Hopkins International Airport", city: "Cleveland, OH" },
{ id: 66, iata: "CLL", lat: 30.5886, lng: -96.3638, name: "Easterwood Airport", city: "College Station, TX" },
{ id: 67, iata: "CLT", lat: 35.214, lng: -80.9431, name: "Charlotte Douglas International Airport", city: "Charlotte, NC" },
{ id: 68, iata: "CMH", lat: 39.998, lng: -82.8919, name: "Port Columbus International Airport", city: "Columbus, OH" },
{ id: 69, iata: "CMI", lat: 40.0393, lng: -88.2781, name: "University of Illinois - Willard Airport", city: "Champaign/Urbana, IL" },
{ id: 70, iata: "CMX", lat: 47.1684, lng: -88.4891, name: "Houghton County Memorial Airport", city: "Hancock, MI" },
{ id: 71, iata: "CNY", lat: 38.755, lng: -109.7548, name: "Canyonlands Field", city: "Moab, UT" },
{ id: 72, iata: "COD", lat: 44.5202, lng: -109.0238, name: "Yellowstone Regional Airport", city: "Cody, WY" },
{ id: 73, iata: "COS", lat: 38.8058, lng: -104.7002, name: "City of Colorado Springs Municipal Airport", city: "Colorado Springs, CO" },
{ id: 74, iata: "COU", lat: 38.8181, lng: -92.2196, name: "Columbia Regional Airport", city: "Columbia, MO" },
{ id: 75, iata: "CPR", lat: 42.9084, lng: -106.4645, name: "Natrona County International Airport", city: "Casper, WY" },
{ id: 76, iata: "CRP", lat: 27.7704, lng: -97.5012, name: "Corpus Christi International Airport", city: "Corpus Christi, TX" },
{ id: 77, iata: "CRW", lat: 38.3732, lng: -81.5932, name: "Yeager Airport", city: "Charleston, WV" },
{ id: 78, iata: "CSG", lat: 32.5163, lng: -84.9389, name: "Columbus Metropolitan Airport", city: "Columbus, GA" },
{ id: 79, iata: "CVG", lat: 39.0461, lng: -84.6622, name: "Cincinnati/Northern Kentucky International Airport", city: "Covington, KY" },
{ id: 80, iata: "CWA", lat: 44.7776, lng: -89.6668, name: "Central Wisconsin Airport", city: "Mosinee, WI" },
{ id: 81, iata: "DAB", lat: 29.1799, lng: -81.0581, name: "Daytona Beach International Airport", city: "Daytona Beach, FL" },
{ id: 82, iata: "DAL", lat: 32.8471, lng: -96.8518, name: "Dallas Love Field", city: "Dallas, TX" },
{ id: 83, iata: "DAY", lat: 39.9024, lng: -84.2194, name: "James M. Cox Dayton International Airport", city: "Dayton, OH" },
{ id: 84, iata: "DBQ", lat: 42.403, lng: -90.7092, name: "Dubuque Regional Airport", city: "Dubuque, IA" },
{ id: 85, iata: "DCA", lat: 38.8521, lng: -77.0377, name: "Ronald Reagan Washington National Airport", city: "Arlington, VA" },
{ id: 86, iata: "DEN", lat: 39.8584, lng: -104.667, name: "Denver International Airport", city: "Denver, CO" },
{ id: 87, iata: "DFW", lat: 32.8959, lng: -97.0372, name: "Dallas/Fort Worth International Airport", city: "Dallas-Fort Worth, TX" },
{ id: 88, iata: "DHN", lat: 31.3213, lng: -85.4496, name: "Dothan Regional Airport", city: "Dothan, AL" },
{ id: 89, iata: "DIK", lat: 46.7974, lng: -102.802, name: "Dickinson Theodore Roosevelt Regional Airport", city: "Dickinson, ND" },
{ id: 90, iata: "DLG", lat: 59.0454, lng: -158.5033, name: "Dillingham Airport", city: "Dillingham, AK" },
{ id: 91, iata: "DLH", lat: 46.8421, lng: -92.1937, name: "Duluth International Airport", city: "Duluth, MN" },
{ id: 92, iata: "DRO", lat: 37.1515, lng: -107.7538, name: "Durango-La Plata County Airport", city: "Durango, CO" },
{ id: 93, iata: "DSM", lat: 41.5349, lng: -93.6607, name: "Des Moines International Airport", city: "Des Moines, IA" },
{ id: 94, iata: "DTW", lat: 42.2121, lng: -83.3488, name: "Detroit Metropolitan Airport", city: "Detroit, MI" },
{ id: 95, iata: "DVL", lat: 48.1142, lng: -98.9088, name: "Devils Lake Regional Airport", city: "Devils Lake, ND" },
{ id: 96, iata: "EAU", lat: 44.8653, lng: -91.4851, name: "Chippewa Valley Regional Airport", city: "Eau Claire, WI" },
{ id: 97, iata: "ECP", lat: null, lng: null, name: "Northwest Florida Beaches International Airport", city: "Panama City, FL" },
{ id: 98, iata: "EGE", lat: 39.6426, lng: -106.9177, name: "Eagle County Regional Airport", city: "Eagle, CO" },
{ id: 99, iata: "EKO", lat: 40.8249, lng: -115.7917, name: "Elko Regional Airport", city: "Elko, NV" },
{ id: 100, iata: "ELM", lat: 42.1599, lng: -76.8914, name: "Elmira/Corning Regional Airport", city: "Elmira, NY" },
{ id: 101, iata: "ELP", lat: 31.8067, lng: -106.3778, name: "El Paso International Airport", city: "El Paso, TX" },
{ id: 102, iata: "ERI", lat: 42.082, lng: -80.1762, name: "Erie International Airport", city: "Erie, PA" },
{ id: 103, iata: "ESC", lat: 45.7227, lng: -87.0937, name: "Delta County Airport", city: "Escanaba, MI" },
{ id: 104, iata: "EUG", lat: 44.1233, lng: -123.2187, name: "Eugene Airport (Mahlon Sweet Field)", city: "Eugene, OR" },
{ id: 105, iata: "EVV", lat: 38.038, lng: -87.5306, name: "Evansville Regional Airport", city: "Evansville, IN" },
{ id: 106, iata: "EWN", lat: 35.073, lng: -77.0429, name: "Coastal Carolina Regional Airport (Craven County Regional)", city: "New Bern, NC" },
{ id: 107, iata: "EWR", lat: 40.6925, lng: -74.1687, name: "Newark Liberty International Airport", city: "Newark, NJ" },
{ id: 108, iata: "EYW", lat: 24.5561, lng: -81.7596, name: "Key West International Airport", city: "Key West, FL" },
{ id: 109, iata: "FAI", lat: 64.8137, lng: -147.8597, name: "Fairbanks International Airport", city: "Fairbanks, AK" },
{ id: 110, iata: "FAR", lat: 46.9194, lng: -96.815, name: "Hector International Airport", city: "Fargo, ND" },
{ id: 111, iata: "FAT", lat: 36.7762, lng: -119.7181, name: "Fresno Yosemite International Airport", city: "Fresno, CA" },
{ id: 112, iata: "FAY", lat: 34.9915, lng: -78.88, name: "Fayetteville Regional Airport", city: "Fayetteville, NC" },
{ id: 113, iata: "FCA", lat: 48.3114, lng: -114.2551, name: "Glacier Park International Airport", city: "Kalispell, MT" },
{ id: 114, iata: "FLG", lat: 35.1384, lng: -111.6712, name: "Flagstaff Pulliam Airport", city: "Flagstaff, AZ" },
{ id: 115, iata: "FLL", lat: 26.0726, lng: -80.1527, name: "Fort Lauderdale-Hollywood International Airport", city: "Ft. Lauderdale, FL" },
{ id: 116, iata: "FNT", lat: 42.9655, lng: -83.7435, name: "Bishop International Airport", city: "Flint, MI" },
{ id: 117, iata: "FSD", lat: 43.5814, lng: -96.7417, name: "Sioux Falls Regional Airport", city: "Sioux Falls, SD" },
{ id: 118, iata: "FSM", lat: 35.3366, lng: -94.3674, name: "Fort Smith Regional Airport", city: "Fort Smith, AR" },
{ id: 119, iata: "FWA", lat: 40.9785, lng: -85.1951, name: "Fort Wayne International Airport", city: "Fort Wayne, IN" },
{ id: 120, iata: "GCC", lat: 44.3489, lng: -105.5394, name: "Gillette-Campbell County Airport", city: "Gillette, WY" },
{ id: 121, iata: "GCK", lat: 37.9275, lng: -100.7244, name: "Garden City Regional Airport", city: "Garden City, KS" },
{ id: 122, iata: "GEG", lat: 47.6199, lng: -117.5338, name: "Spokane International Airport", city: "Spokane, WA" },
{ id: 123, iata: "GFK", lat: 47.9493, lng: -97.1761, name: "Grand Forks International Airport", city: "Grand Forks, ND" },
{ id: 124, iata: "GGG", lat: 32.3849, lng: -94.7117, name: "East Texas Regional Airport", city: "Longview, TX" },
{ id: 125, iata: "GJT", lat: 39.1224, lng: -108.5267, name: "Grand Junction Regional Airport (Walker Field)", city: "Grand Junction, CO" },
{ id: 126, iata: "GNV", lat: 29.6901, lng: -82.2718, name: "Gainesville Regional Airport", city: "Gainesville, FL" },
{ id: 127, iata: "GPT", lat: 30.4073, lng: -89.0701, name: "Gulfport-Biloxi International Airport", city: "Gulfport-Biloxi, MS" },
{ id: 128, iata: "GRB", lat: 44.4851, lng: -88.1296, name: "Green Bay-Austin Straubel International Airport", city: "Green Bay, WI" },
{ id: 129, iata: "GRI", lat: 40.9675, lng: -98.3086, name: "Central Nebraska Regional Airport", city: "Grand Island, NE" },
{ id: 130, iata: "GRK", lat: 31.0649, lng: -97.8278, name: "Killeen-Fort Hood Regional Airport", city: "Killeen, TX" },
{ id: 131, iata: "GRR", lat: 42.8808, lng: -85.5228, name: "Gerald R. Ford International Airport", city: "Grand Rapids, MI" },
{ id: 132, iata: "GSO", lat: 36.0977, lng: -79.9373, name: "Piedmont Triad International Airport", city: "Greensboro, NC" },
{ id: 133, iata: "GSP", lat: 34.8957, lng: -82.2189, name: "Greenville-Spartanburg International Airport", city: "Greer, SC" },
{ id: 134, iata: "GST", lat: 58.4244, lng: -135.7074, name: "Gustavus Airport", city: "Gustavus, AK" },
{ id: 135, iata: "GTF", lat: 47.482, lng: -111.3707, name: "Great Falls International Airport", city: "Great Falls, MT" },
{ id: 136, iata: "GTR", lat: 33.4503, lng: -88.5914, name: "Golden Triangle Regional Airport", city: "Columbus-Starkville-West Point, MS" },
{ id: 137, iata: "GUC", lat: 38.534, lng: -106.9332, name: "Gunnison-Crested Butte Regional Airport", city: "Gunnison, CO" },
{ id: 138, iata: "GUM", lat: 13.4834, lng: -144.796, name: "Guam International Airport", city: "Agana, GU" },
{ id: 139, iata: "HDN", lat: 40.4812, lng: -107.2177, name: "Yampa Valley Airport (Yampa Valley Regional)", city: "Hayden, CO" },
{ id: 140, iata: "HIB", lat: 47.3866, lng: -92.839, name: "Range Regional Airport (Chisholm-Hibbing Airport)", city: "Hibbing, MN" },
{ id: 141, iata: "HLN", lat: 46.6068, lng: -111.9827, name: "Helena Regional Airport", city: "Helena, MT" },
{ id: 142, iata: "HNL", lat: 21.3187, lng: -157.9224, name: "Honolulu International Airport", city: "Honolulu, HI" },
{ id: 143, iata: "HOB", lat: 32.6875, lng: -103.217, name: "Lea County Regional Airport", city: "Hobbs, NM" },
{ id: 144, iata: "HOU", lat: 29.6454, lng: -95.2789, name: "William P. Hobby Airport", city: "Houston, TX" },
{ id: 145, iata: "HPN", lat: 41.067, lng: -73.7076, name: "Westchester County Airport", city: "White Plains, NY" },
{ id: 146, iata: "HRL", lat: 26.2285, lng: -97.6544, name: "Valley International Airport", city: "Harlingen, TX" },
{ id: 147, iata: "HSV", lat: 34.6405, lng: -86.7731, name: "Huntsville International Airport", city: "Huntsville, AL" },
{ id: 148, iata: "HYA", lat: 41.6693, lng: -70.2804, name: "Barnstable Municipal Airport", city: "Hyannis, MA" },
{ id: 149, iata: "HYS", lat: 38.8449, lng: -99.274, name: "Hays Regional Airport", city: "Hays, KS" },
{ id: 150, iata: "IAD", lat: 38.9445, lng: -77.4558, name: "Washington Dulles International Airport", city: "Chantilly, VA" },
{ id: 151, iata: "IAG", lat: 43.1073, lng: -78.9454, name: "Niagara Falls International Airport", city: "Niagara Falls, NY" },
{ id: 152, iata: "IAH", lat: 29.9805, lng: -95.3397, name: "George Bush Intercontinental Airport", city: "Houston, TX" },
{ id: 153, iata: "ICT", lat: 37.65, lng: -97.433, name: "Wichita Dwight D. Eisenhower National Airport (Wichita Mid-Continent Airport)", city: "Wichita, KS" },
{ id: 154, iata: "IDA", lat: 43.5146, lng: -112.0702, name: "Idaho Falls Regional Airport", city: "Idaho Falls, ID" },
{ id: 155, iata: "ILG", lat: 39.6787, lng: -75.6065, name: "Wilmington Airport", city: "Wilmington, DE" },
{ id: 156, iata: "ILM", lat: 34.2706, lng: -77.9026, name: "Wilmington International Airport", city: "Wilmington, NC" },
{ id: 157, iata: "IMT", lat: 45.8184, lng: -88.1145, name: "Ford Airport", city: "Iron Mountain/Kingsford, MI" },
{ id: 158, iata: "IND", lat: 39.7173, lng: -86.2944, name: "Indianapolis International Airport", city: "Indianapolis, IN" },
{ id: 159, iata: "INL", lat: 48.5662, lng: -93.4031, name: "Falls International Airport", city: "International Falls, MN" },
{ id: 160, iata: "ISN", lat: 48.1779, lng: -103.6423, name: "Sloulin Field International Airport", city: "Williston, ND" },
{ id: 161, iata: "ISP", lat: 40.7952, lng: -73.1002, name: "Long Island MacArthur Airport", city: "Islip, NY" },
{ id: 162, iata: "ITH", lat: 42.491, lng: -76.4584, name: "Ithaca Tompkins Regional Airport", city: "Ithaca, NY" },
{ id: 163, iata: "ITO", lat: 19.7203, lng: -155.0485, name: "Hilo International Airport", city: "Hilo, HI" },
{ id: 164, iata: "JAC", lat: 43.6073, lng: -110.7377, name: "Jackson Hole Airport", city: "Jackson, WY" },
{ id: 165, iata: "JAN", lat: 32.3112, lng: -90.0759, name: "Jackson-Evers International Airport", city: "Jackson, MS" },
{ id: 166, iata: "JAX", lat: 30.4941, lng: -81.6879, name: "Jacksonville International Airport", city: "Jacksonville, FL" },
{ id: 167, iata: "JFK", lat: 40.6397, lng: -73.7789, name: "John F. Kennedy International Airport (New York International Airport)", city: "New York, NY" },
{ id: 168, iata: "JLN", lat: 37.1518, lng: -94.4983, name: "Joplin Regional Airport", city: "Joplin, MO" },
{ id: 169, iata: "JMS", lat: 46.9297, lng: -98.6782, name: "Jamestown Regional Airport", city: "Jamestown, ND" },
{ id: 170, iata: "JNU", lat: 58.355, lng: -134.5763, name: "Juneau International Airport", city: "Juneau, AK" },
{ id: 171, iata: "KOA", lat: 19.7388, lng: -156.0456, name: "Kona International Airport at Keahole", city: "Kailua/Kona, HI" },
{ id: 172, iata: "KTN", lat: 55.3556, lng: -131.7137, name: "Ketchikan International Airport", city: "Ketchikan, AK" },
{ id: 173, iata: "LAN", lat: 42.7787, lng: -84.5874, name: "Capital Region International Airport (Lansing Capital City)", city: "Lansing, MI" },
{ id: 174, iata: "LAR", lat: 41.312, lng: -105.675, name: "Laramie Regional Airport", city: "Laramie, WY" },
{ id: 175, iata: "LAS", lat: 36.0804, lng: -115.1523, name: "McCarran International Airport", city: "Las Vegas, NV" },
{ id: 176, iata: "LAW", lat: 34.5677, lng: -98.4166, name: "Lawton-Fort Sill Regional Airport", city: "Lawton, OK" },
{ id: 177, iata: "LAX", lat: 33.9425, lng: -118.4081, name: "Los Angeles International Airport", city: "Los Angeles, CA" },
{ id: 178, iata: "LBB", lat: 33.6636, lng: -101.8228, name: "Lubbock Preston Smith International Airport", city: "Lubbock, TX" },
{ id: 179, iata: "LBE", lat: 40.2759, lng: -79.4048, name: "Arnold Palmer Regional Airport", city: "Latrobe, PA" },
{ id: 180, iata: "LCH", lat: 30.1261, lng: -93.2234, name: "Lake Charles Regional Airport", city: "Lake Charles, LA" },
{ id: 181, iata: "LEX", lat: 38.037, lng: -84.6054, name: "Blue Grass Airport", city: "Lexington, KY" },
{ id: 182, iata: "LFT", lat: 30.2053, lng: -91.9877, name: "Lafayette Regional Airport", city: "Lafayette, LA" },
{ id: 183, iata: "LGA", lat: 40.7772, lng: -73.8726, name: "LaGuardia Airport (Marine Air Terminal)", city: "New York, NY" },
{ id: 184, iata: "LGB", lat: 33.8177, lng: -118.1516, name: "Long Beach Airport (Daugherty Field)", city: "Long Beach, CA" },
{ id: 185, iata: "LIH", lat: 21.976, lng: -159.339, name: "Lihue Airport", city: "Lihue, HI" },
{ id: 186, iata: "LIT", lat: 34.7294, lng: -92.2242, name: "Bill and Hillary Clinton National Airport (Adams Field)", city: "Little Rock, AR" },
{ id: 187, iata: "LNK", lat: 40.851, lng: -96.7592, name: "Lincoln Airport (Lincoln Municipal)", city: "Lincoln, NE" },
{ id: 188, iata: "LRD", lat: 27.5437, lng: -99.4615, name: "Laredo International Airport", city: "Laredo, TX" },
{ id: 189, iata: "LSE", lat: 43.8794, lng: -91.2565, name: "La Crosse Regional Airport", city: "La Crosse, WI" },
{ id: 190, iata: "LWS", lat: 46.3745, lng: -117.0154, name: "Lewiston-Nez Perce County Airport", city: "Lewiston, ID" },
{ id: 191, iata: "MAF", lat: 31.9425, lng: -102.2019, name: "Midland International Airport", city: "Midland, TX" },
{ id: 192, iata: "MBS", lat: 43.5329, lng: -84.0797, name: "MBS International Airport", city: "Saginaw, MI" },
{ id: 193, iata: "MCI", lat: 39.2976, lng: -94.7139, name: "Kansas City International Airport", city: "Kansas City, MO" },
{ id: 194, iata: "MCO", lat: 28.4289, lng: -81.316, name: "Orlando International Airport", city: "Orlando, FL" },
{ id: 195, iata: "MDT", lat: 40.1935, lng: -76.7634, name: "Harrisburg International Airport", city: "Harrisburg, PA" },
{ id: 196, iata: "MDW", lat: 41.786, lng: -87.7524, name: "Chicago Midway International Airport", city: "Chicago, IL" },
{ id: 197, iata: "MEI", lat: 32.3331, lng: -88.7512, name: "Meridian Regional Airport", city: "Meridian, MS" },
{ id: 198, iata: "MEM", lat: 35.0424, lng: -89.9767, name: "Memphis International Airport", city: "Memphis, TN" },
{ id: 199, iata: "MFE", lat: 26.1758, lng: -98.2386, name: "McAllen-Miller International Airport (McAllen Miller International)", city: "McAllen, TX" },
{ id: 200, iata: "MFR", lat: 42.3742, lng: -122.8735, name: "Rogue Valley International Airport", city: "Medford, OR" },
{ id: 201, iata: "MGM", lat: 32.3006, lng: -86.394, name: "Montgomery Regional Airport", city: "Montgomery, AL" },
{ id: 202, iata: "MHK", lat: 39.141, lng: -96.6708, name: "Manhattan Regional Airport", city: "Manhattan, KS" },
{ id: 203, iata: "MHT", lat: 42.9345, lng: -71.4371, name: "Manchester-Boston Regional Airport", city: "Manchester, NH" },
{ id: 204, iata: "MIA", lat: 25.7933, lng: -80.2906, name: "Miami International Airport", city: "Miami, FL" },
{ id: 205, iata: "MKE", lat: 42.9472, lng: -87.8966, name: "General Mitchell International Airport", city: "Milwaukee, WI" },
{ id: 206, iata: "MKG", lat: 43.1695, lng: -86.2382, name: "Muskegon County Airport", city: "Muskegon, MI" },
{ id: 207, iata: "MLB", lat: 28.1028, lng: -80.6458, name: "Melbourne International Airport", city: "Melbourne, FL" },
{ id: 208, iata: "MLI", lat: 41.4485, lng: -90.5075, name: "Quad City International Airport", city: "Moline, IL" },
{ id: 209, iata: "MLU", lat: 32.5109, lng: -92.0377, name: "Monroe Regional Airport", city: "Monroe, LA" },
{ id: 210, iata: "MMH", lat: 37.624, lng: -118.8378, name: "Mammoth Yosemite Airport", city: "Mammoth Lakes, CA" },
{ id: 211, iata: "MOB", lat: 30.6914, lng: -88.2428, name: "Mobile Regional Airport", city: "Mobile, AL" }
  ];

  const [formData, setFormData] = useState({
    YEAR: "",
    MONTH: "",
    DAY: "",
    AIRLINE: "",
    FLIGHT_NUMBER: "",
    ORIGIN_AIRPORT: "",
    ORIGIN_LATITUDE: "",
    ORIGIN_LONGITUDE: "",
    DESTINATION_AIRPORT: "",
    SCHEDULED_DEPARTURE: "",
    SCHEDULED_TIME: "",
    ORIGIN_WEATHER: "",
    ORIGIN_WIND_SPEED: ""
  });

  const [groqResponse, setGroqResponse] = useState(null);
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);
  const [originQuery, setOriginQuery] = useState("");
  const [destQuery, setDestQuery] = useState("");
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [predictionType, setPredictionType] = useState("regression");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [predictionError, setPredictionError] = useState(null);
  const [routeData, setRouteData] = useState(null);

  const originInputRef = useRef(null);
  const destInputRef = useRef(null);
  const originSuggestionsRef = useRef(null);
  const destSuggestionsRef = useRef(null);

  const API_KEY = "9b4c61e964d913cea22a069b86917223";
  const API_BASE_URL = "http://localhost:8000";

  // Weather condition mapping
  const conditionMap = {
    "clear sky": "Clear",
    "few clouds": "Partly Cloudy",
    "scattered clouds": "Partly Cloudy",
    "broken clouds": "Overcast",
    "overcast clouds": "Overcast",
    "light rain": "Rain: Slight",
    "moderate rain": "Rain: Moderate",
    "heavy intensity rain": "Rain: Heavy",
    "light snow": "Snow: Slight",
    "snow": "Snow: Moderate",
    "heavy snow": "Snow: Heavy",
    "mist": "Drizzle: Light",
    "fog": "Drizzle: Dense"
  };

  // Animated airplane component for background
  const AnimatedPlane = ({ delay = 0, duration = "20s", opacity = 0.1 }) => (
    <div
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ animationDelay: delay }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="absolute"
          style={{
            animation: `fly ${duration} linear infinite`,
            animationDelay: delay,
            opacity
          }}
        >
          <Plane size={48} className="text-blue-400 rotate-45" />
        </div>
      </div>
    </div>
  );

  const getWeatherReport = async (lat, lon) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      const windSpeed = data.wind.speed;
      const condition = data.weather[0].description;
      const mappedCondition = conditionMap[condition.toLowerCase()] || condition;
      
      return {
        wind_speed_m_s: windSpeed,
        condition: mappedCondition
      };
    } catch (error) {
      console.error("Weather fetch error:", error);
      return null;
    }
  };

  const filterAirports = (query) => {
    if (!query || query.length < 1) return [];
    const lowercaseQuery = query.toLowerCase();
    return airports.filter(airport =>
      airport.iata.toLowerCase().includes(lowercaseQuery) ||
      airport.name.toLowerCase().includes(lowercaseQuery) ||
      airport.city.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 5);
  };

  const handleOriginSearch = (e) => {
    const query = e.target.value;
    setOriginQuery(query);
    if (query.length > 0) {
      setOriginSuggestions(filterAirports(query));
      setShowOriginSuggestions(true);
    } else {
      setOriginSuggestions([]);
      setShowOriginSuggestions(false);
    }
  };

  const handleDestSearch = (e) => {
    const query = e.target.value;
    setDestQuery(query);
    if (query.length > 0) {
      setDestSuggestions(filterAirports(query));
      setShowDestSuggestions(true);
    } else {
      setDestSuggestions([]);
      setShowDestSuggestions(false);
    }
  };

  const selectOriginAirport = async (airport) => {
    setWeatherLoading(true);
    
    setFormData(prev => ({
      ...prev,
      ORIGIN_AIRPORT: airport.iata,
      ORIGIN_LATITUDE: airport.lat.toString(),
      ORIGIN_LONGITUDE: airport.lng.toString()
    }));
    setOriginQuery(`${airport.iata} - ${airport.name}`);
    setShowOriginSuggestions(false);

    const weatherData = await getWeatherReport(airport.lat, airport.lng);
    if (weatherData) {
      setFormData(prev => ({
        ...prev,
        ORIGIN_WEATHER: weatherData.condition,
        ORIGIN_WIND_SPEED: weatherData.wind_speed_m_s.toString()
      }));
    }
    
    setWeatherLoading(false);
  };

  const selectDestAirport = (airport) => {
    setFormData(prev => ({
      ...prev,
      DESTINATION_AIRPORT: airport.iata
    }));
    setDestQuery(`${airport.iata} - ${airport.name}`);
    setShowDestSuggestions(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    const requiredFields = [
      'YEAR', 'MONTH', 'DAY', 'AIRLINE', 'FLIGHT_NUMBER', 
      'ORIGIN_AIRPORT', 'DESTINATION_AIRPORT', 'SCHEDULED_DEPARTURE', 'SCHEDULED_TIME'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = `${field.replace(/_/g, " ")} is required`;
      }
    });

    if (formData.YEAR && (formData.YEAR < 2000 || formData.YEAR > 2030)) {
      newErrors.YEAR = "Year must be between 2000 and 2030";
    }
    
    if (formData.MONTH && (formData.MONTH < 1 || formData.MONTH > 12)) {
      newErrors.MONTH = "Month must be between 1 and 12";
    }
    
    if (formData.DAY && (formData.DAY < 1 || formData.DAY > 31)) {
      newErrors.DAY = "Day must be between 1 and 31";
    }

    if (formData.SCHEDULED_DEPARTURE && (formData.SCHEDULED_DEPARTURE < 0 || formData.SCHEDULED_DEPARTURE > 2359)) {
      newErrors.SCHEDULED_DEPARTURE = "Scheduled departure must be in HHMM format (0-2359)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };





  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsSubmitting(true);
  setPrediction(null);
  setPredictionError(null);
  setGroqResponse(null);

  // Prepare flight data
  const submitData = {
    YEAR: parseInt(formData.YEAR),
    MONTH: parseInt(formData.MONTH),
    DAY: parseInt(formData.DAY),
    AIRLINE: formData.AIRLINE,
    FLIGHT_NUMBER: parseInt(formData.FLIGHT_NUMBER),
    ORIGIN_AIRPORT: formData.ORIGIN_AIRPORT,
    ORIGIN_LATITUDE: parseFloat(formData.ORIGIN_LATITUDE),
    ORIGIN_LONGITUDE: parseFloat(formData.ORIGIN_LONGITUDE),
    DESTINATION_AIRPORT: formData.DESTINATION_AIRPORT,
    SCHEDULED_DEPARTURE: parseInt(formData.SCHEDULED_DEPARTURE),
    SCHEDULED_TIME: parseInt(formData.SCHEDULED_TIME),
    ORIGIN_WEATHER: formData.ORIGIN_WEATHER,
    ORIGIN_WIND_SPEED: parseFloat(formData.ORIGIN_WIND_SPEED),
  };

  try {
    // ---- STEP 1: Call your prediction backend ----
    const endpoint =
      predictionType === "classification"
        ? "/predict/classification"
        : "/predict/regression";

    const response = await fetch(
      `http://smartudaanpredictai.dedyn.io${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      }
    );

    if (!response.ok) throw new Error(`Backend error: ${response.status}`);

    const result = await response.json();
    setPrediction(result);

    // ---- STEP 2: Call Groq API for top 3 features ----
    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,

        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are an expert aviation analyst. Given the following prediction and SHAP explanations, identify the TOP 3 most important features driving the delay prediction. Write them clearly, in plain English, in a short numbered list format. Ignore minor/unimportant features.",
            },
            {
              role: "user",
              content: `Here is the flight data: ${JSON.stringify(
                submitData
              )}. And here is the model prediction: ${JSON.stringify(result)}.`,
            },
          ],
        }),
      }
    );

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      throw new Error(
        `Groq API error! status: ${groqRes.status}, body: ${errText}`
      );
    }

    const groqData = await groqRes.json();
    console.log("Groq response:", groqData);

    // ✅ Clean response
    let explanation =
      groqData.choices?.[0]?.message?.content?.trim() ||
      "No explanation available.";

    // Remove stars/markdown
    explanation = explanation.replace(/\*/g, "");

    // Remove unnecessary intro phrases
    explanation = explanation.replace(/Based on.*?are:/i, "").trim();

    // Split into array by numbered points
    const lines = explanation
      .split(/\d\.\s+/)
      .filter((line) => line.trim() !== "");

    setGroqResponse(lines); // Set as array for React rendering
  } catch (error) {
    console.error("Submission error:", error);
    setPredictionError(error.message);
  } finally {
    setIsSubmitting(false);
  }
};


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (originSuggestionsRef.current && !originSuggestionsRef.current.contains(event.target) && !originInputRef.current.contains(event.target)) {
        setShowOriginSuggestions(false);
      }
      if (destSuggestionsRef.current && !destSuggestionsRef.current.contains(event.target) && !destInputRef.current.contains(event.target)) {
        setShowDestSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fieldConfig = {
    YEAR: { type: "number", step: "1", min: "2000", max: "2030", icon: <Clock size={18} /> },
    MONTH: { type: "number", step: "1", min: "1", max: "12", icon: <Clock size={18} /> },
    DAY: { type: "number", step: "1", min: "1", max: "31", icon: <Clock size={18} /> },
    AIRLINE: { type: "text", placeholder: "e.g., UA, AA, DL", icon: <Plane size={18} /> },
    FLIGHT_NUMBER: { type: "number", step: "1", min: "1", icon: <Plane size={18} /> },
    SCHEDULED_DEPARTURE: { type: "number", step: "1", min: "0", max: "2359", placeholder: "HHMM format (e.g., 1905)", icon: <Clock size={18} /> },
    SCHEDULED_TIME: { type: "number", step: "1", min: "1", placeholder: "Minutes", icon: <Clock size={18} /> },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-black relative overflow-hidden">
      {/* CSS Keyframes for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fly {
            0% {
              transform: translate(-100px, 80vh) rotate(45deg);
              opacity: 0;
            }
            10% {
              opacity: 0.3;
            }
            90% {
              opacity: 0.3;
            }
            100% {
              transform: translate(calc(100vw + 100px), 20vh) rotate(45deg);
              opacity: 0;
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(253, 236, 41, 0.3);
            }
            50% {
              box-shadow: 0 0 40px rgba(246, 243, 52, 0.6);
            }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-pulse-glow {
            animation: pulse-glow 3s ease-in-out infinite;
          }
          
          .glass-morphism {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
        `
      }} />

      {/* Animated background planes */}
      <AnimatedPlane delay="0s" duration="25s" opacity={0.08} />
      <AnimatedPlane delay="8s" duration="30s" opacity={0.06} />
      <AnimatedPlane delay="16s" duration="28s" opacity={0.05} />

      

      {/* Main Content */}
      <Background>
      <main className="relative z-10 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          
          <div className="text-center mb-12 mt-10">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 drop-shadow-lg">
            AI Delay Predictor
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="text-white-200 font-semibold">Harness the power of </span>
           <span className="text-yellow-200 font-semibold">Machine learning </span> 
           <span className="text-orange-500 font-semibold">to predict flight delay </span>
            <span className="font-semibold text-yellow-200">real-time weather integration</span>.
          </p>
            
          </div>

          {/* Main Form Card */}
          <div className="bg-black rounded-3xl p-8 mb-8 border-2 border-orange-500 animate-pulse-glow">
            {/* Prediction Type Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-yellow-200 mb-4 flex items-center">
                <AlertCircle className="mr-2" size={20} />
                Prediction Type
              </h3>
              <div className="flex space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="regression"
                    checked={predictionType === "regression"}
                    onChange={(e) => setPredictionType(e.target.value)}
                    className="mr-3 accent-red-400"
                  />
                  <span className="text-yellow-200">Regression (Delay Duration in Minutes)</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="classification"
                    checked={predictionType === "classification"}
                    onChange={(e) => setPredictionType(e.target.value)}
                    className="mr-3 accent-orange-400"
                  />
                  <span className="text-yellow-200">Classification (Delay Probability)</span>
                </label>
              </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
              {/* Origin Airport */}
              <div className="relative lg:col-span-1">
                <label className="block text-sm font-medium text-yellow-200 mb-2 flex items-center">
                  <MapPin size={16} className="mr-2" />
                  Origin Airport
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    ref={originInputRef}
                    type="text"
                    value={originQuery}
                    onChange={handleOriginSearch}
                    onFocus={() => { if (originSuggestions.length > 0) setShowOriginSuggestions(true); }}
                    placeholder="Search by IATA, name, or city..."
                    className={`w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-yellow-100 focus:outline-none focus:border-orange-400 focus:bg-white/15 transition-all ${
                      errors.ORIGIN_AIRPORT ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.ORIGIN_AIRPORT && (
                    <p className="text-red-400 text-xs mt-1">{errors.ORIGIN_AIRPORT}</p>
                  )}
                  {showOriginSuggestions && originSuggestions.length > 0 && (
                    <div ref={originSuggestionsRef} className="absolute z-50 w-full mt-1 bg-slate-800/95 backdrop-blur-md border border-white/20 rounded-xl shadow-xl max-h-64 overflow-y-auto">
                      {originSuggestions.map((airport) => (
                        <div
                          key={airport.id}
                          onClick={() => selectOriginAirport(airport)}
                          className="px-4 py-2 hover:bg-orange-500/20 cursor-pointer border-b border-white/10 last:border-b-0"
                        >
                          <div className="font-semibold text-orange-300">{airport.iata}</div>
                          <div className="text-sm text-white truncate">{airport.name}</div>
                          <div className="text-xs text-yellow-400">{airport.city}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Destination Airport */}
              <div className="relative lg:col-span-1">
                <label className="block text-sm font-medium text-yellow-200 mb-2 flex items-center">
                  <MapPin size={16} className="mr-2" />
                  Destination Airport
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    ref={destInputRef}
                    type="text"
                    value={destQuery}
                    onChange={handleDestSearch}
                    onFocus={() => { if (destSuggestions.length > 0) setShowDestSuggestions(true); }}
                    placeholder="Search by IATA, name, or city..."
                    className={`w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-yellow-100 focus:outline-none focus:border-orange-400 focus:bg-white/15 transition-all ${
                      errors.DESTINATION_AIRPORT ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.DESTINATION_AIRPORT && (
                    <p className="text-red-400 text-xs mt-1">{errors.DESTINATION_AIRPORT}</p>
                  )}
                  {showDestSuggestions && destSuggestions.length > 0 && (
                    <div ref={destSuggestionsRef} className="absolute z-50 w-full mt-1 bg-slate-800/95 backdrop-blur-md border border-white/20 rounded-xl shadow-xl max-h-64 overflow-y-auto">
                      {destSuggestions.map((airport) => (
                        <div
                          key={airport.id}
                          onClick={() => selectDestAirport(airport)}
                          className="px-4 py-2 hover:bg-blue-500/20 cursor-pointer border-b border-white/10 last:border-b-0"
                        >
                          <div className="font-semibold text-orange-300">{airport.iata}</div>
                          <div className="text-sm text-white truncate">{airport.name}</div>
                          <div className="text-xs text-yellow-400">{airport.city}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Other Form Fields */}
              {Object.entries(fieldConfig).map(([field, config]) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-yellow-200 mb-2 flex items-center">
                    {config.icon}
                    <span className="ml-2">{field.replace(/_/g, " ")}</span>
                    <span className="text-red-400 ml-1">*</span>
                  </label>
                  <input
                    type={config.type}
                    step={config.step}
                    min={config.min}
                    max={config.max}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={config.placeholder}
                    className={`w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-yellow-100 focus:outline-none focus:border-orange-400 focus:bg-white/15 transition-all ${
                      errors[field] ? 'border-red-400' : ''
                    }`}
                  />
                  {errors[field] && (
                    <p className="text-red-400 text-xs mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}

              {/* Weather Fields */}
              <div>
                <label className="block text-sm font-medium text-yellow-200 mb-2 flex items-center">
                  <Cloud size={16} className="mr-2" />
                  Origin Weather
                </label>
                <input
                  type="text"
                  name="ORIGIN_WEATHER"
                  value={formData.ORIGIN_WEATHER}
                  readOnly
                  placeholder="Auto-filled from weather API"
                  className="w-full px-4 py-3 bg-green-500/10 border border-green-400/30 rounded-xl text-green-300 placeholder-green-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-yellow-200 mb-2 flex items-center">
                  <Wind size={16} className="mr-2" />
                  Wind Speed (m/s)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="ORIGIN_WIND_SPEED"
                  value={formData.ORIGIN_WIND_SPEED}
                  readOnly
                  placeholder="Auto-filled from weather API"
                  className="w-full px-4 py-3 bg-green-500/10 border border-green-400/30 rounded-xl text-green-300 placeholder-green-400"
                />
              </div>
            </div>

            {/* Airport Info Cards */}
            {(formData.ORIGIN_AIRPORT || formData.DESTINATION_AIRPORT) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Origin Info */}
                {formData.ORIGIN_AIRPORT && (
                  <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-4">
                    <h4 className="font-medium text-green-300 mb-3 flex items-center">
                      <MapPin size={16} className="mr-2" />
                      Origin Airport Details
                      {weatherLoading && (
                        <div className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-green-400"></div>
                      )}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-400">IATA Code:</span>
                        <span className="text-white font-medium">{formData.ORIGIN_AIRPORT}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-400">Weather:</span>
                        <span className="text-white font-medium">{formData.ORIGIN_WEATHER || 'Loading...'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-400">Wind Speed:</span>
                        <span className="text-white font-medium">{formData.ORIGIN_WIND_SPEED ? `${formData.ORIGIN_WIND_SPEED} m/s` : 'Loading...'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Destination Info */}
                {formData.DESTINATION_AIRPORT && (
                  <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4">
                    <h4 className="font-medium text-yellow-300 mb-3 flex items-center">
                      <MapPin size={16} className="mr-2" />
                      Destination Airport Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-yellow-200">IATA Code:</span>
                        <span className="text-white font-medium">{formData.DESTINATION_AIRPORT}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={weatherLoading || isSubmitting}
              className="w-full py-4 px-8 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50 flex items-center justify-center space-x-3"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analyzing Flight Data...</span>
                </>
              ) : weatherLoading ? (
                <>
                  <Cloud className="animate-pulse" size={20} />
                  <span>Loading Weather Data...</span>
                </>
              ) : (
                <>
                  <Plane size={20} />
                  <span>Predict Flight Delay</span>
                </>
              )}
            </button>
          </div>

          {/* Results Section */}
          {prediction && (
            <div className="glass-morphism rounded-3xl p-8 mb-8 animate-float">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
                  {predictionType === "regression" ? (
                    prediction.predicted_delay_minutes > 0 ? (
                      <AlertCircle className="text-red-400 mr-2" size={24} />
                    ) : (
                      <CheckCircle className="text-green-400 mr-2" size={24} />
                    )
                  ) : (
                    prediction.delay_probability > 0.5 ? (
                      <AlertCircle className="text-red-400 mr-2" size={24} />
                    ) : (
                      <CheckCircle className="text-green-400 mr-2" size={24} />
                    )
                  )}
                  Prediction Result
                </h3>
                
                <div className={`inline-flex items-center px-8 py-4 rounded-2xl text-white font-bold text-xl shadow-2xl ${
                  predictionType === "regression" 
                    ? prediction.predicted_delay_minutes > 0 
                      ? 'bg-gradient-to-r from-red-500 to-red-600' 
                      : 'bg-gradient-to-r from-green-500 to-green-600'
                    : prediction.delay_probability > 0.5
                      ? 'bg-gradient-to-r from-red-500 to-red-600'
                      : 'bg-gradient-to-r from-green-500 to-green-600'
                }`}>
                  {groqResponse && (
                    <ol>
                  {groqResponse.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ol>
)}



                  

                  {predictionType === "regression" ? (
                    <>
                      <Clock className="mr-3" size={24} />
                      {prediction.predicted_delay_minutes > 0 
                        ? `Delayed by ${Math.round(prediction.predicted_delay_minutes)} minutes`
                        : prediction.predicted_delay_minutes === 0
                        ? 'On Time'
                        : `Early by ${Math.abs(Math.round(prediction.predicted_delay_minutes))} minutes`
                      }
                    </>
                  ) : (
                    <>
                      <AlertCircle className="mr-3" size={24} />
                      {`${Math.round(prediction.delay_probability * 100)}% Delay Probability`}
                    </>
                  )}
                </div>
              </div>

              {/* Route Visualization */}
              {routeData && (
                <div className="mt-8">
                  <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-bold text-white">Flight Route</h4>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        routeData.isDelayed ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
                      }`}>
                        {routeData.isDelayed ? 'Delayed Flight' : 'On-Time Flight'}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-4">
                        <div className="flex items-center mb-2">
                          <MapPin className="text-green-400 mr-2" size={16} />
                          <span className="text-green-300 font-bold">{routeData.origin.iata}</span>
                          <span className="text-xs text-green-400 ml-2">ORIGIN</span>
                        </div>
                        <p className="text-white text-sm font-medium">{routeData.origin.city}</p>
                        <p className="text-green-200 text-xs truncate">{routeData.origin.name}</p>
                      </div>
                      
                      <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4">
                        <div className="flex items-center mb-2">
                          <MapPin className="text-red-400 mr-2" size={16} />
                          <span className="text-red-300 font-bold">{routeData.destination.iata}</span>
                          <span className="text-xs text-red-400 ml-2">DESTINATION</span>
                        </div>
                        <p className="text-white text-sm font-medium">{routeData.destination.city}</p>
                        <p className="text-red-200 text-xs truncate">{routeData.destination.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error Display */}
          {predictionError && (
            <div className="bg-red-500/10 border border-red-400/30 rounded-2xl p-6 mb-8">
              <div className="flex items-center mb-3">
                <AlertCircle className="text-red-400 mr-3" size={24} />
                <h3 className="text-lg font-bold text-red-300">Prediction Error</h3>
              </div>
              <p className="text-red-200">{predictionError}</p>
            </div>
          )}

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 ">
            {[
              { 
                icon: <Plane className="text-blue-400 " size={32} />, 
                title: 'AI Powered Predictions', 
                desc: 'Advanced machine learning algorithms trained on millions of flight records'
              },
              { 
                icon: <Cloud className="text-green-400" size={32} />, 
                title: 'Real-time Weather', 
                desc: 'Live weather data integration for accurate delay forecasting'
              },
              { 
                icon: <Clock className="text-purple-400" size={32} />, 
                title: 'Instant Results', 
                desc: 'Get predictions in seconds with detailed analysis and visualizations'
              }
            ].map((feature, index) => (
              <div key={index} className="glass-morphism rounded-2xl p-6 text-center transform transition-all duration-300 hover:scale-105 
           border-2 border-orange-900 shadow-[0_0_12px_rgba(251,146,60,0.6)]"
>
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="font-bold text-white mb-2 text-lg">{feature.title}</h3>
                <p className="text-yellow-200 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      </Background>

      
      {/* Footer */}
     <footer className="relative z-20 mt-16 py-8 border-t border-gray-700 
                     bg-gradient-to-br from-yellow-500 via-orange-700 to-red-900">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <p className="text-gray-100 text-sm">
        © 2024 <span className="text-yellow-200 font-semibold">FlightPredict AI</span>. Powered by 
        <span className="text-orange-200 italic"> advanced machine learning</span> and real-time data.
      </p>
    </div>
    </footer>


    </div>
  );
};

export default EnhancedFlightPredict;