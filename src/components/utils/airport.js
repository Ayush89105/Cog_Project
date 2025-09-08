export const airportMap = {
  1: {
    iata: "ABE",
    lat: 40.6524,
    lng: -75.4404,
    name: "Lehigh Valley International Airport",
    city: "Allentown, PA"
  },
  2: {
    iata: "ABQ",
    lat: 35.0402,
    lng: -106.6092,
    name: "Albuquerque International Sunport",
    city: "Albuquerque, NM"
  },
  3: {
    iata: "ACK",
    lat: 41.2531,
    lng: -70.0602,
    name: "Nantucket Memorial Airport",
    city: "Nantucket, MA"
  }
};

export function searchAirports(query) {
  if (!query) return [];
  query = query.toLowerCase();
  return Object.values(airportMap).filter(
    (a) =>
      a.iata.toLowerCase().includes(query) ||
      a.name.toLowerCase().includes(query) ||
      a.city.toLowerCase().includes(query)
  );
}