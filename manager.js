const jsonStringBands = fs.readFileSync("allBands.json");
const allBands = JSON.parse(jsonStringBands);
const jsonStringMusicians = fs.readFileSync("allMusicians.json");
const allMusicians = JSON.parse(jsonStringMusicians);
const jsonStringRetiredBands = fs.readFileSync("retiredBands.json");
const retiredBands = JSON.parse(jsonStringRetiredBands);
const jsonStringRetiredMusicians = fs.readFileSync("retiredMusicians.json");
const retiredMusicians = JSON.parse(jsonStringRetiredMusicians);

export default class Manager{
  bands=[]
  musicians = []
  constructor() {
    this.bands = allBands;
    this.musicians = allMusicians;

  }
  
  createNewArtist() {
  const newId = allMusicians.length + 1
  console.log("Skriv namnet på den nya artisten.")
  const newArtistName = prompt();
  console.log("Skriv lite information om artisten.")
  const newArtistInfo = prompt();
  console.log("När är artisten född?")
  const addArtistBirthday = prompt();
  console.log("Vilket eller vilka band tillhör den här artisten?")
  const instrumentsPlayed = prompt();
    console.log("Ny artist sparad i registret.")
    this.update()
  return new Musician(newId, newArtistName, newArtistInfo, addArtistBirthday, addJoinedBands, addPastBands, instrumentsPlayed)
}
  createNewBand() {
  console.log("Skriv namnet på bandet")
  const newBandName = prompt();
  console.log("Skriv lite information om bandet.")
  const newBandInfo = prompt();
  console.log("Vilket år grundades bandet?")
  const founded = prompt();
  console.log("Vilket år splittrades bandet?")
    console.log("Nytt band sparat i registret.")
    this.update()
  return new Band(newBandName, newBandInfo, founded, disolved, current, previous)
}
  printAllMusicians() {
  for (let i = 0; i < allMusicians.length; i++) {
    console.log(`${i + 1}. ${allMusicians[i].name}`);
    }
  }
  printAllBands() {
    for (let i = 0; i < allBands.length; i++) {
      console.log(`${i + 1}. ${allBands[i].name}`);
    }
  }
  removeBand() {
    this.printAllBands();
    console.log("Skriv in siffran för bandet du vill ta bort");
    const removed = prompt();
    if (isNaN(Number(removed))) {
      console.log("Skriv den angivna siffran för att ta bort önskad artist.");
    }
    if (removed <= allBands.getLength() && removed >= 1) {
      allBands.removeBand(Number(removed) - 1);
      this.update
    } else {
      console.log(`Skriv den angivna siffran för att ta bort önskad artist.`);
    }
  }
  //Ej klar, tar ej bort musician. 
  removeMusician() {
  this.printAllMusicians();
  console.log("Skriv in siffran för artisten du vill ta bort");
  const removed = prompt();
  if (isNaN(Number(removed))) {
    console.log("Skriv den angivna siffran för att ta bort önskad artist.");
  }
  if (removed <= allMusicians.getLength() && removed >= 1) {
    allMusicians.removeMusician(Number(removed) - 1);
    this.update()
  } else {
    console.log(`Skriv den angivna siffran för att ta bort önskad artist.`);
  }
}
  printRetiredMusicians() {
    for (let i = 0; i < retiredMusicians.length; i++) {
      console.log(`${i + 1}. ${retiredMusicians[i].name}`);
    }
  }
  printRetiredBands() {
    for (let i = 0; i < retiredBands.length; i++) {
      console.log(`${i + 1}. ${retiredBands[i].name}`);
    }
  }
  newMember(name, joinedYear, instrument) {
    this.currentMembers.push({
      name: name,
      joinedYear: joinedYear,
      instrument: instrument
    })
    this.update()
  }
  searchArtist() {
    console.log("Skriv ett artistnamn")
    const userSearch = prompt();
    let foundMusician = allMusicians.filter(function (musician) {
      return musician.name.includes(userSearch)
    });
    console.log(foundMusician);
  }
  searchBand() {
    console.log("Skriv ett bandnamn")
    const userSearch = prompt();
    let foundBand = allBands.filter(function (band) {
      return band.bandName.includes(userSearch)
    });
    console.log(foundBand);
  }
  update() {
    fs.writeFileSync('./allBands.json', JSON.stringify(allBands, null, 2), (err) => {
      if (err) throw err;
      console.log('Sparar ny information');
    });
    fs.writeFileSync('./allMusicians.json', JSON.stringify(allMusicians, null, 2), (err) => {
      if (err) throw err;
      console.log('Sparar ny information');
    });
    fs.writeFileSync('./retiredMusicians.json', JSON.stringify(retiredMusicians, null, 2), (err) => {
      if (err) throw err;
      console.log('Sparar ny information');
    });
    fs.writeFileSync('./retiredBands.json', JSON.stringify(retiredBands, null, 2), (err) => {
      if (err) throw err;
      console.log('Sparar ny information');
    });
  }
}

